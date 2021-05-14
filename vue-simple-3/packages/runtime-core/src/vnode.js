import { isArray, isObj, isString } from "@vue/shared";
// type maybe element tag name or component obj(an object that contain render function)
export function createVNode(type, props, children = null) {
    // 可以根据type 来区分是组件 还是普通的元素
    // 根据type来区分 是元素还是组件
    // 给虚拟节点加一个类型
    const shapeFlag = isString(type) ? 1 /* ELEMENT */ : isObj(type) ? 4 /* STATEFUL_COMPONENT */ : 0;
    const vNode = {
        type,
        props,
        children,
        shapeFlag,
        el: null,
        key: props.key,
        component: null,
        _is_VNode: true,
    };
    if (children)
        normalizeChildren(vNode, children);
    return vNode;
}
function normalizeChildren(vNode, children) {
    let childrenType = 0;
    //数组
    if (isArray(children))
        childrenType = 16 /* ARRAY_CHILDREN */;
    //文本
    if (isString(children))
        childrenType = 8 /* TEXT_CHILDREN */;
    vNode.shapeFlag |= childrenType;
}
//# sourceMappingURL=vnode.js.map