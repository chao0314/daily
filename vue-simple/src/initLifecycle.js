import patchDomTree from "./vnode/patch";
import Watcher from "./observer/watcher";

export default function initLifeCycleMixin(Vue) {

    Vue.prototype._update = function (vnode) {

        const vm = this;
        //用虚拟dom 生成真实dom
        vm.$el = patchDomTree(vm.$el, vnode);

    }


}

export function mountComponent(vm, $el) {

    vm.$el = $el || vm.$el;

    // 更新函数 数据变化后 会再次调用此函数,后续更新可以调用updateComponent方法,
    // 调用renderToVDomTree函数，生成虚拟dom tree,用虚拟dom 生成真实dom
    // let vNodeTree = vm._renderToVDomTree();
    let updateComponent = () => {
        vm._update(vm._renderToVDomTree());

    }

    new Watcher(vm, updateComponent, () => console.log("component update"));


}