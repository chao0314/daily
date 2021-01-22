import {isFn} from './utils/index';
import observe from "./observer/index";

export default function initState(vm) {

    if (vm.$options.data) {

        initData(vm);

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