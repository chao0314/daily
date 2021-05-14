import {isArray, isObj, isString, isVNode, ShapeFlags} from "@vue/shared";

// type maybe element tag name or component obj(an object that contain render function)
export function createVNode(type, props, children = null) {
    // 可以根据type 来区分是组件 还是普通的元素
    // 根据type来区分 是元素还是组件
    // 给虚拟节点加一个类型
    const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObj(type) ? ShapeFlags.STATEFUL_COMPONENT : 0;

    const vNode = {
        type,
        props,
        children,//slots 也属于
        shapeFlag,
        el: null,
        key: props.key,
        component: null,
        _is_VNode: true,
    }

    if (children) normalizeChildren(vNode, children);

    return vNode;
}

export const Text = Symbol('Text');

export function normalizeVNode(vnode) {

    //已经是 vnode 了
    if (isObj(vnode) && isVNode(vnode)) return vnode;
    if (isString(vnode)) return createVNode(Text, null, String(vnode))
    throw new Error('normalize virtual node  error');

}


function normalizeChildren(vNode, children) {
    let childrenType = 0;
    //数组
    if (isArray(children)) childrenType = ShapeFlags.ARRAY_CHILDREN;
    //文本
    if (isString(children)) childrenType = ShapeFlags.TEXT_CHILDREN;

    vNode.shapeFlag |= childrenType;

}


