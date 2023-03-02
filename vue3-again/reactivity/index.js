import {arrayMethodMutations} from "./array.js";

const depsMapBucket = new WeakMap();
const effectStack = [];
let activeEffect = null;

const jobQueue = [];
let isFlushing = false;

// 对象 for in 处理

const iterate_key = Symbol('iterate_key');

const TriggerType = {ADD: 'ADD', SET: 'SET', DEl: 'DEl'};

//避免重复代理 死循环
const hadProxy = new WeakMap();

//是否收集 副作用函数依赖，在数组方法 如push等有用，push会改变length，但默认也会读取length
//会导致 无限循环，堆满调用栈
export const trackOptions = {
    shouldTrack: true
};

export function addJob(jobFn) {

    if (jobQueue.includes(jobFn)) return;

    jobQueue.push(jobFn);

}

export function flushJob() {


    if (isFlushing) return;

    isFlushing = true;

    Promise.resolve().then(() => {

        jobQueue.forEach(job => job());

    }).finally(() => isFlushing = false);

}

function cleanup(effectFn) {

    const propDeps = effectFn.propDeps;

    if (propDeps) {
        propDeps.forEach(propDepsSet => propDepsSet.delete(effectFn));
        propDeps.length = 0;
    }


}

function traverse(obj, seen = new Set()) {

    //暂时 只考虑了 Object 对象类型，没有考虑 Array 等

    if (obj === null || typeof obj !== 'object') return;

    for (const p in obj) {

        const value = obj[p];

        if (value !== null && typeof obj === 'object' && !seen.has(value)) {
            // seen 避免循环引用，导致死循环
            traverse(value, seen);
            seen.add(value)
        }

    }

    return obj;

}

export function track(target, p) {

    //不收集  退出
    if (!trackOptions.shouldTrack) return;

    let targetDepMap = depsMapBucket.get(target);
    if (!targetDepMap) depsMapBucket.set(target, targetDepMap = new Map());
    let propDepsSet = targetDepMap.get(p);
    if (!propDepsSet) targetDepMap.set(p, propDepsSet = new Set());
    // console.log('track---', p, activeEffect.id)
    if (activeEffect) {
        propDepsSet.add(activeEffect);
        //便于 cleanup
        activeEffect.propDeps.push(propDepsSet);
    }


}

export function trigger(target, p, type, value) {

    const targetDepMap = depsMapBucket.get(target);

    if (!targetDepMap) return;

    const propDepSet = targetDepMap.get(p);

    let iterateKeyDepSet;

    if (type === TriggerType.ADD || type === TriggerType.DEl) {
        // 添加 删除 属性，需要触发 遍历的副作用函数
        iterateKeyDepSet = targetDepMap.get(iterate_key);

    }

    // 如果是数组 ADD 还会影响到 收集了 length的副作用函数

    let lengthDepSet;

    if (Array.isArray(target) && type === TriggerType.ADD) {

        lengthDepSet = targetDepMap.get('length');


    }

    // 如果是数组，直接修改了 length ，例如 arr.length = 10 那么，index 10以后的数组数据都受影响，需要响应变化

    let indexDepSet;

    if (Array.isArray(target) && p === 'length') {

        const nowLength = Number(value);
        const oldLength = target.length;

        for (let i = nowLength; i < oldLength; i++) {

            if (!indexDepSet) indexDepSet = new Set();

            const depSet = targetDepMap.get(i);

            if (depSet) indexDepSet.add(...depSet);

        }

    }

    //解决一边遍历一边修改的导致的无限循环问题
    const effectsToRun = new Set();
    if (propDepSet) effectsToRun.add(...propDepSet);
    if (iterateKeyDepSet) effectsToRun.add(...iterateKeyDepSet);
    if (lengthDepSet) effectsToRun.add(...lengthDepSet);
    if (indexDepSet) effectsToRun.add(...indexDepSet);

    effectsToRun.forEach(effectFn => {

        //console.log('trigger---', p, effectFn.id);
        //当前正在执行的 退出，例如 obj.i++
        if (activeEffect !== effectFn) {
            const {scheduler} = effectFn.options;
            if (scheduler instanceof Function) scheduler(effectFn);
            else effectFn();
        }

    })

}

let i = 0;

export function effect(fn, options = {lazy: false}) {

    const effectFn = () => {

        // 清理 之前遗留的 副作用 effect,每次执行，重新收集

        cleanup(effectFn);

        activeEffect = effectFn;
        //解决嵌套effect
        effectStack.push(effectFn);

        //res 用于 computed等
        const res = fn();

        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];

        return res;
    }

    effectFn.id = i++

    effectFn.propDeps = [];
    effectFn.options = options;

    // effectFn();


    if (!options.lazy) effectFn();


    return effectFn;


}


function createReactive(obj, isShallow = false, isReadonly = false) {

    if (typeof obj === 'object' && obj !== null) {

        if (hadProxy.has(obj)) return hadProxy.get(obj);

        const proxy = new Proxy(obj, {

            get(target, p, receiver) {

                // 为 receiver 设置 _raw 属性，用于区分 receiver是哪个 target的代理，从而避免
                // 原型链继承时的，子对象修改了属性，但是父子都被触发副作用 @2

                if (p === '_raw') return target;

                //如果是数组，并且是需要拦截的数组方法

                if (Array.isArray(target) && arrayMethodMutations.hasOwnProperty(p)) {

                    return Reflect.get(arrayMethodMutations, p, receiver);

                }


                //只读的属性，不需要收集，因为不会改变，无需响应式
                //todo...
                // 内部 symbol 不收集 [Symbol.iterator]等
                // bug? 如果自定义的symbol?
                // todo...

                if (!isReadonly && typeof p !== 'symbol') track(target, p);

                const res = Reflect.get(target, p, receiver);

                if (typeof res === 'object' && res !== null && !isShallow)
                    return isReadonly ? readonly(res) : reactive(res);

                return res;

            },
            set(target, p, value, receiver) {

                // console.log('set', p, value)
                const oldValue = target[p];
                const hasProp = Object.hasOwn(target, p);

                const triggerType = hasProp ? TriggerType.SET : TriggerType.ADD;

                if (isReadonly) {

                    console.warn(`${p} is readonly property`);
                    return true;
                }


                const res = Reflect.set(target, p, value, receiver);

                //@2
                if (receiver._raw !== target) return res;


                // value 未变， 不需要触发 副作用函数, NaN 不等于 NaN

                if (oldValue !== value && (oldValue === oldValue || value === value)) {

                    // console.log('---', triggerType)
                    trigger(target, p, triggerType, value);

                }

                return res;

            },
            ownKeys(target) {

                // console.log('ownKeys--')

                // 数组遍历 依赖于length,不需要和普通对象一样手动新增一个 iterate_key 属性

                Array.isArray(target) ? track(target, 'length') : track(target, iterate_key);

                return Reflect.ownKeys(target);

            },
            deleteProperty(target, p) {

                if (isReadonly) {

                    console.warn(`${p} is readonly property`);
                    return true;
                }

                const res = Reflect.deleteProperty(target, p);

                // 删除没有的属性，不用管，不触发遍历 副作用函数
                if (Object.hasOwn(target, p)) trigger(target, p, TriggerType.DEl);

                return res;

            }

        })
        hadProxy.set(obj, proxy);

        return proxy;
    }

}

export function reactive(obj) {

    return createReactive(obj, false, false);

}

export function shallowReactive(obj) {

    return createReactive(obj, true, false);
}

export function readonly(obj) {

    return createReactive(obj, false, true);
}

export function shallowReadonly(obj) {

    return createReactive(obj, true, true);
}

export function computed(getter) {

    let dirty = true;
    let value;
    //依赖改变后 设置dirty true;
    const effectFn = effect(getter, {
        //computed的getter依赖改变后，触发computed的effectFn执行，但是有scheduler，
        // 在scheduler触发依赖 computed的的其他effect执行
        lazy: true, scheduler: () => {
            dirty = true;
            trigger(obj, 'value');
        }
    });

    const obj = {

        get value() {

            if (dirty) {
                //调用时，在实行 副作用effect，即 getter
                value = effectFn();
                dirty = false;
            }

            //收集 computed.value
            track(obj, 'value');
            return value;
        }

    }

    return obj;

}

export function watch(source, cb, options = {immediate: false, flush: 'post'}) {

    let getter;
    let oldValue;
    let newValue;
    let cleanup;
    if (typeof source === 'function') getter = source;
    else if (source && typeof source === 'object') getter = () => traverse(source);
    else return;

    const cbJob = () => {

        if (cleanup) cleanup();

        newValue = effectFn();
        cb(oldValue, newValue, onInvalidate);
        oldValue = newValue;

    }


    const onInvalidate = (cleanupFn) => {

        cleanup = cleanupFn;

    }


    const effectFn = effect(getter, {
        //交由后续，手动执行 @1
        lazy: true,
        scheduler: () => {
            const {flush = 'post'} = options;

            if (flush === 'post') Promise.resolve().then(cbJob);
            else if (flush === 'sync') cbJob();


        }
    })


    const {immediate = false} = options;

    // 回调立即执行,执行内 有 effectFn 收集副作用，@1
    if (immediate) cbJob();
    // 搜集副作用依赖 @1
    else oldValue = effectFn();

}











