import {isFn} from './utils/index';
import observe from "./observer/index";
import Watcher from "./observer/watcher";

export default function initState(vm) {

    if (vm.$options.data) {

        initData(vm);

    }

    // computed


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

function initWatch(vm) {

    let watch = vm.$options.watch;

    Object.entries(watch).forEach(([key, value]) => {

        $watch(vm, key, value);
    })


}

export function $watch(vm, key, handler) {

    if (Array.isArray(handler)) handler = function (newV, oldV) {
        handler.forEach(h => h(newV, oldV));

    }

    new Watcher(vm, key, handler, {isCustomWatch: true})


}