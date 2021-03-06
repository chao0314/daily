import patchDomTree from "./vnode/patch";
import Watcher from "./observer/watcher";
import nextTick from "./utils/nextTick";

export default function initLifeCycleMixin(Vue) {
    // 目前 mounted updated 都执行，即未区分是否首次渲染，对 lifecycle hook 略有影响。
    Vue.prototype._update = function (vnode) {

        const vm = this;
        //用虚拟dom 生成真实dom
        const oldVNode = vm._curVNode;

        if (oldVNode) {
            callLifeCycleHook(vm, 'beforeUpdate');
            vm.$el = patchDomTree(oldVNode, vnode);
            callLifeCycleHook(vm, 'updated');


        } else {
            //初次渲染
            callLifeCycleHook(vm, 'beforeMount');
            vm.$el = patchDomTree(vm.$el, vnode);
            callLifeCycleHook(vm, 'mounted');

        }


        vm._curVNode = vnode;

    }

    Vue.prototype.$nextTick = nextTick;


}

export function mountComponent(vm, $el) {

    vm.$el = $el || vm.$el;

    // 更新函数 数据变化后 会再次调用此函数,后续更新可以调用updateComponent方法,
    // 调用renderToVDomTree函数，生成虚拟dom tree,用虚拟dom 生成真实dom
    // let vNodeTree = vm._renderToVDomTree();
    let updateComponent = () => {
        vm._update(vm._renderToVDomTree());

    }

    new Watcher(vm, updateComponent, () => console.log("component watcher update"));


}


export function callLifeCycleHook(vm, lifecycle) {

    let handlers = vm.$options[lifecycle] || [];
    handlers.forEach(handler => handler.call(vm));


}

