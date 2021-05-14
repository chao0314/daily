import { createVNode } from "./vnode";
import { isNo } from "@vue/shared";
import { createComponentInstance, setupComponent } from "./component";
function processElement(oldVNode, newVNode, container) {
}
function processText(oldVNode, newVNode, container) {
}
function mountComponent(vnode, container) {
    const instance = vnode.component = createComponentInstance(vnode);
    //主要处理组件实例相关数据，例如 setup 方法 的返回值等，返回 render function 或者 reactive state
    setupComponent(instance);
}
function processComponent(oldVNode, newVNode, container) {
    //初次渲染 mount
    if (isNo(oldVNode)) {
        mountComponent(newVNode, container);
    }
}
function patch(oldVNode, newVNode, container) {
    const { shapeFlag } = newVNode;
    if (shapeFlag & 1 /* ELEMENT */)
        return processElement(oldVNode, newVNode, container);
    if (shapeFlag & 4 /* STATEFUL_COMPONENT */)
        return processComponent(oldVNode, newVNode, container);
}
export function createRenderer(rendererOptions) {
    return {
        createApp(rootComponent, rootProps) {
            const render = (vNode, container) => {
                //初次渲染
                patch(null, vNode, container);
            };
            const app = {
                _props: rootProps,
                _component: rootComponent,
                _container: null,
                mount(container) {
                    app._container = container;
                    const vNode = createVNode(rootComponent, rootProps);
                    render(vNode, container);
                }
            };
            return app;
        }
    };
}
//# sourceMappingURL=renderer.js.map