import { isFn, isNo, isObj } from "@vue/shared";
import componentInstanceProxyHandler from "./componentInstanceProxyHandler";
export function createComponentInstance(vnode) {
    const instance = {
        vnode,
        type: vnode.type,
        props: {},
        attrs: {},
        slots: {},
        ctx: {},
        data: {},
        setupState: {},
        render: null,
        subTree: null,
        isMounted: false // 表示这个组件是否挂载过
    };
    //做其他事情，添加其他属性，此处简化
    instance.ctx = { _: instance };
    return instance;
}
export function setupComponent(instance) {
    const { props, children } = instance.vnode;
    // initProps()
    instance.props = props;
    // 插槽的解析 initSlot()
    instance.children = children;
    const isStatefulComponent = 4 /* STATEFUL_COMPONENT */ & instance.vnode.shapeFlag;
    if (isStatefulComponent)
        setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const componentOptions = instance.type;
    const { setup, render, template } = componentOptions;
    instance.proxy = new Proxy(instance.ctx, componentInstanceProxyHandler);
    if (setup) {
        const context = createSetupContext(instance);
        const setupResult = setup(instance.props, context);
        if (isFn(setupResult))
            instance.render = setupResult;
        else if (isObj(setupResult))
            instance.setupState = setupResult;
    }
    if (isNo(instance.render) && isNo(render) && isNo(template))
        throw new Error('need render or template');
    //没有setup 返回的 render 函数，但是有组件参数里的 render 方法
    if (isNo(instance.render) && render) {
        instance.render = render;
    }
    //没有setup 返回的 render 函数，但是有模板 那么需要模板编译
    if (isNo(instance.render) && template) {
        //todo...
    }
}
function createSetupContext(instance) {
    const { attrs, slots } = instance;
    return {
        attrs,
        slots,
        emit: () => {
        }
    };
}
//# sourceMappingURL=component.js.map