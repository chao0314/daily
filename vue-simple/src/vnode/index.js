import {isHtmlTag, isObj} from "../utils/index";

export function createVElement(vm, tagName, data, ...children) {

    if (isHtmlTag(tagName)) return createVNode(vm, tagName, data, children);

    return createComponentVNode(vm, tagName, data, children);

}

export function createVText(vm, text) {

    return createVNode(vm, null, null, null, text);

}

//对于组件来说 children 是 slot;
function createComponentVNode(vm, tagName, data, ...children) {

    const Vue = vm.$options._base;
    const registeredComponents = vm.$options.components;
    let VueComponent = registeredComponents[tagName];
    if (!VueComponent) throw new Error(`component : ${tagName} no registered`);
    if (isObj(VueComponent)) VueComponent = Vue.extend(VueComponent)
    // console.log('create component vnode');


    return createVNode(vm, tagName, data, children, null, null, null, {
        VueComponent,
        instance: null,
        slots: children

    })


}

//data 近似 props
function createVNode(vm, tagName, data, children, text, key, el, componentOptions) {

    return {vm, tagName, data, children, text, key, el, componentOptions};

}