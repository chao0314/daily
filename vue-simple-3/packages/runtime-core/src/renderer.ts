import {createVNode, normalizeVNode, Text} from "./vnode";
import {isNo, ShapeFlags} from "@vue/shared";
import {createComponentInstance, setupComponent} from "./component";
import {effect} from "@vue/reactivity";
import {patchProp} from "../../runtime-dom/src/patchProp";
import {queueJob} from "./scheduler";


export function createRenderer(rendererOptions) {

    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createTextNode: hostCreateText,
        setTextNodeValue: hostSetText,
        setElementText: hostSetElementText,
    } = rendererOptions

    function processComponent(oldVNode, newVNode, container) {

        //初次渲染 component mount
        if (isNo(oldVNode)) {

            mountComponent(newVNode, container);

        }


    }

    function processElement(oldVNode, newVNode, container) {

        //初次渲染 element mount
        if (isNo(oldVNode)) {

            mountElement(newVNode, container);
        }


    }

    function processText(oldVNode, newVNode, container) {


        //初次渲染 text node
        if (isNo(oldVNode)) {
            newVNode.el = hostCreateText(newVNode.children);
            hostInsert(newVNode.el, container);

        }

    }


    function mountElement(vnode, container) {

        const {type, props, children, shapeFlag} = vnode;
        const el = vnode.el = hostCreateElement(type);
        Object.entries(props).forEach(([prop, value]) => patchProp(el, prop, null, value));
        //children是单个文本字符串  直接设置元素的文本内容
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) hostSetElementText(el, children);
        //children是数组，那么需要处理里面的文本字符串和 virtual dom 夹杂的情况，如果直接设置文本，会导致前一个设置的文本内容被覆盖
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {

            for (let i = 0; i < children.length; i++) {
                const childVNode = normalizeVNode(children[i]);
                patch(null, childVNode, el);
            }

        }

        hostInsert(el,container);


    }

    function setupComponentRenderEffect(instance, container) {

        instance.update = effect(function componentEffect() {

            if (instance.isMounted) {
                // 已渲染,更新操作
                //todo...
                console.log('update component');

            } else {
                //初次渲染
                const instanceProxyToUse = instance.proxy;
                //构建组件的 virtual dom tree ,即组件的 虚拟 dom 子树
                //此处的 render 函数是 setupComponent 处理的 rendererOptions 里的 setup 的函数返回值
                //或者 template模板编译出来的函数，或者 render 属性对应的 函数
                //用于生成 虚拟dom树，借助 h function 实现 ，例如： h('div',{},h('span'));
                instance.subtree = instance.render.call(instanceProxyToUse, instanceProxyToUse);
                //由组件虚拟dom tree ，生成真实dom树，并挂载
                patch(null, instance.subtree, container);
                instance.isMounted = true;
                instance.vnode.el = instance.subtree.el;

            }


        }, {
            lazy: false,
            scheduler: queueJob
        })

    }

    function mountComponent(vnode, container) {

        const instance = vnode.component = createComponentInstance(vnode);

        //主要处理组件实例相关数据，例如 setup 方法 的返回值等，返回 render function 或者 reactive state
        setupComponent(instance);
        //组件添加渲染 effect
        setupComponentRenderEffect(instance, container);


    }


    function patch(oldVNode, newVNode, container) {

        const {type, shapeFlag} = newVNode;
        if (type === Text) return processText(oldVNode, newVNode, container);
        if (shapeFlag & ShapeFlags.ELEMENT) return processElement(oldVNode, newVNode, container);
        if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) return processComponent(oldVNode, newVNode, container);

    }


    return {
        createApp(rootComponent, rootProps) {

            const render = (vNode, container) => {
                //初次渲染
                patch(null, vNode, container);

            }

            const app = {
                _props: rootProps,
                _component: rootComponent,
                _container: null,
                mount(container) {
                    app._container = container;
                    const vNode = createVNode(rootComponent, rootProps);
                    render(vNode, container);
                }
            }

            return app;

        }
    }

}