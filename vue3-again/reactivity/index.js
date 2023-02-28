const depsMapBucket = new WeakMap();
const effectStack = [];
let activeEffect = null;


const jobQueue = [];
let isFlushing = false;

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

export function track(target, p) {

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


export function trigger(target, p) {


    const targetDepMap = depsMapBucket.get(target);

    if (!targetDepMap) return;

    const propDepSet = targetDepMap.get(p);

    if (!propDepSet) return;

    //解决一边遍历一边修改的导致的无限循环问题
    const effectsToRun = new Set(propDepSet);

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


// TODO  对象 for in 处理

export function reactive(obj, isShallow = false, isReadonly = false) {

    return new Proxy(obj, {

        get(target, p, receiver) {

            // 为 receiver 设置 _raw 属性，用于区分 receiver是哪个 target的代理，从而避免
            // 原型链继承时的，子对象修改了属性，但是父子都被触发副作用 @2

            if (p === '_raw') return target;

            track(target, p);

            return Reflect.get(target, p, receiver);

        },
        set(target, p, value, receiver) {


            // console.log('set', p, value, receiver._raw !== target)
            const oldValue = target[p];

            const res = Reflect.set(target, p, value, receiver);

            //@2
            if (receiver._raw !== target) return res;

            // value 未变， 不需要触发 副作用函数, NaN 不等于 NaN

            if (oldValue !== value && (oldValue === oldValue || value === value)) {

                trigger(target, p);

            }

            return res;

        }

    })

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








