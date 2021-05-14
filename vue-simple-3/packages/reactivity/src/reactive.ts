import {isObj} from "@vue/shared";
import {reactiveHandler, shallowReactiveHandler, readonlyHandler, shallowReadonlyHandler} from "./handlers";

const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

function createReactiveObj(target, isReadonly = false, handler = {}) {

    if (!isObj(target)) return target;
    const map = isReadonly ? readonlyMap : reactiveMap;
    let proxy = map.get(target);
    if (!proxy) {
        proxy = new Proxy(target, handler);
        map.set(target, proxy);
    }
    return proxy;

}

export function reactive(target) {

    return createReactiveObj(target, false, reactiveHandler)


}

export function shallowReactive(target) {
    return createReactiveObj(target, true, shallowReactiveHandler);


}

export function readonly(target) {

    return createReactiveObj(target, false, readonlyHandler);


}

export function shallowReadonly(target) {

    return createReactiveObj(target, true, shallowReadonlyHandler);
}



