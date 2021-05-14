import {isNo} from "@vue/shared";

export function patchEvent(el, name, handler) {

    const invokers = el._vei || (el._vei = {});
    //onClock onInput and so on ...
    const eventName = name.slice(2).toLowerCase();
    let invoker = invokers[eventName];
    if (invoker) {
        if (handler) invoker.handler = handler;
        else {
            invoker.handler = null;
            el.removeListener(eventName, invoker);

        }
    } else {
        if (handler) {
            invoker = createInvoker(handler);
            invokers[eventName] = invoker;
            el.addEventListener(eventName, invoker);

        }


    }


}

function createInvoker(initHandler) {

    const invoker = e => invoker.handler && invoker.handler(e);
    invoker.handler = initHandler;
    return invoker;
}