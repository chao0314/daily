import {isFn} from './utils/index';
import observe from "./observer/index";
import Watcher from "./observer/watcher";
import Depend from "./observer/depend";

export default function initState(vm) {

    if (vm.$options.data) {

        initData(vm);

    }

    // computed

    if (vm.$options.computed) {

        initComputed(vm);
    }


    // watch

    if (vm.$options.watch) {
        initWatch(vm);

    }


}


function initData(vm) {

    let {data} = vm.$options;
    vm.$data = isFn(data) ? data.call(vm) : data;
    Object.keys(vm.$data).forEach(key => proxyData(vm, '$data', key));
    observe(vm.$data);
}

function proxyData(receiver, proxyKey, key) {

    Object.defineProperty(receiver, key, {
        get() {

            return receiver[proxyKey][key];
        },
        set(v) {

            return receiver[proxyKey][key] = v;
        }


    })

}

function initComputed(vm) {

    let computed = vm.$options.computed;
    Object.entries(computed).forEach(([prop, value]) => {

        let config = {};
        if (value instanceof Function) {

            config.get = value;

        } else {

            config.get = value.get;
            config.set = value.set;

        }

        //借助 watch 收集 computed 的依赖，当依赖改变时改变 watch 的 computedCacheIsValid 作为 缓存是否有效的标志
        let w = new Watcher(vm, config.get, null, {isComputedWatch: true});

        //每个 watcher 初始化 取值完，收集了依赖，就会被清除，仍然有active watcher 说明该 computed 属性 被渲染 组件的渲染 watcher依赖
        //通过将 computed 属性 get 函数内所依赖的属性与 渲染 watcher 关联起来，这样依赖属性改变后，不仅computed 可以重新计算，
        //渲染 watcher 也能更新，重新渲染模板
        let activeWatcher = Depend.getActiveWatcher();
        if (activeWatcher) {
            console.log("---active--")
            w.addOwnDepToActiveWatcher(activeWatcher);
        }

        config.get = function () {
            //computed cache
            if (!w.computedCacheIsValid) {
                w.value = w.getComputedValueFn.call(vm);
                w.computedCacheIsValid = true;
            }
            return w.value;

        }


        Object.defineProperty(vm, prop, config);

    })


}


function initWatch(vm) {

    let watch = vm.$options.watch;

    Object.entries(watch).forEach(([key, value]) => {

        $watch(vm, key, value);
    })


}

export function $watch(vm, key, handler) {

    let immediate = false;

    if (Array.isArray(handler)) {
        handler = function (newV, oldV) {
            handler.forEach(h => h(newV, oldV));
        }
    } else if (typeof handler === 'object') {

        immediate = handler.immediate;
        handler = handler.handler;

    }

    let w = new Watcher(vm, key, handler, {isCustomWatch: true})

    if (immediate) {
        w.updateComponent()
    }


}