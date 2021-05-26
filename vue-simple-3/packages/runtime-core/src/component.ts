import {isFn, isNo, isObj, ShapeFlags} from "@vue/shared";
import componentInstanceProxyHandler from "./componentInstanceProxyHandler";

let currentInstance = null;

export function createComponentInstance(vnode) {

    const instance = {
        vnode,
        type: vnode.type, // 用户写的对象
        props: {}, // props attrs 有区别
        attrs: {},
        slots: {},
        ctx: {},
        data: {},
        setupState: {}, // 如果setup返回一个对象，这个对象会作为setUpstate
        render: null,
        subTree: null, // render函数的返回结果就是subTree
        isMounted: false // 表示这个组件是否挂载过

    };

    //做其他事情，添加其他属性，此处简化
    instance.ctx = {_: instance};
    vnode.component = instance;
    return instance;

}

export function setupComponent(instance) {

    const {props, children} = instance.vnode;
    // initProps()
    instance.props = props;
    // 插槽的解析 initSlot()
    instance.children = children;
    const isStatefulComponent = ShapeFlags.STATEFUL_COMPONENT & instance.vnode.shapeFlag;
    //有状态组件
    if (isStatefulComponent) setupStatefulComponent(instance);


}

export function getCurrentInstance() {
    return currentInstance;

}

export function setCurrentInstance(instance) {

    currentInstance = instance;

}


function setupStatefulComponent(instance) {

    const componentOptions = instance.type;
    const {setup, render, template} = componentOptions;
    instance.proxy = new Proxy(instance.ctx, componentInstanceProxyHandler as any);
    if (setup) {
        const context = createSetupContext(instance)
        // setup 函数执行前 设置当前 instance ,而后 setup 中 lifecycle hook 执行，能够找到对应的 instance，并且使用
        //闭包技巧将 属于自己的 instance 保存下来
        // setup 执行完 情路
        setCurrentInstance(instance);
        const setupResult = setup(instance.props, context);
        setCurrentInstance(null);
        if (isFn(setupResult)) instance.render = setupResult;
        else if (isObj(setupResult)) instance.setupState = setupResult;
    }

    if (isNo(instance.render) && isNo(render) && isNo(template)) throw new Error('need render or template');

    //没有setup 返回的 render 函数，但是有组件参数里的 render 方法
    if (isNo(instance.render) && render) {
        instance.render = render;

    }
    //没有setup 返回的 render 函数，但是有模板 那么需要模板编译
    if (isNo(instance.render) && template) {
        //todo...
        console.log('need compile template');

    }


}


function createSetupContext(instance) {

    const {attrs, slots} = instance;
    return {
        attrs,
        slots,
        emit: () => {
        }

    }

}
