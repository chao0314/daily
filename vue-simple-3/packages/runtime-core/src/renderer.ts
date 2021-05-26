import {createVNode, normalizeVNode, Text} from "./vnode";
import {invokeArrFns, isArray, isNo, isSameVNode, isString, ShapeFlags} from "@vue/shared";
import {createComponentInstance, setupComponent} from "./component";
import {effect} from "@vue/reactivity";
import {patchProp} from "../../runtime-dom/src/patchProp";
import {queueJob} from "./scheduler";
import {getLIS} from "./longestIncreasingSubsequence";
import {nextTick} from "../../shared/src/asyncQueue";


export function createRenderer(rendererOptions) {

    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        nextSibling: hostNextSibling,
        createElement: hostCreateElement,
        createTextNode: hostCreateText,
        setTextNodeValue: hostSetText,
        setElementText: hostSetElementText,
    } = rendererOptions


    /*
    *
    * dom diff
    * */

    function patchChildren(container, oldVNode, newVNode, anchor) {

        const oldChildren = oldVNode.children || null;
        const newChildren = newVNode.children || null;
        const oldChildrenFlag = oldVNode.shapeFlag;
        const newChildrenFlag = newVNode.shapeFlag;


        // 原来无 现在无
        if (isNo(oldChildren) && isNo(newChildren)) return;

        // 原来无 现在有
        if (isNo(oldChildren) && !isNo(newChildren)) {
            // 现在是文本 直接设置
            if (newChildrenFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(container, newChildren);

            } else {
                //现在是数组  直接添加
                for (let i = 0; i < newChildren.length; i++) {
                    const childNode = normalizeVNode(newChildren[i]);
                    newChildren[i] = childNode;
                    patch(null, childNode, container, anchor);

                }

            }

            // 原来有 现在无 直接删除
        } else if (!isNo(oldChildren) && isNo(newChildren)) {

            //原来是文本
            if (oldChildrenFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(container, '');
                //原来是数组
            } else {
                // 卸载 原有元素或组件
                for (let i = 0; i < oldChildren.length; i++) {
                    const childNode = oldChildren[i];
                    const shapeFlag = childNode.shapeFlag;
                    if ((shapeFlag & ShapeFlags.ELEMENT) || (shapeFlag & ShapeFlags.COMPONENT)) {

                        unmount(childNode);
                    }

                }
                container.innerHTML = '';


            }

        } else {
            // 原来有 现在有

            //原来文本 现在文本
            if (oldChildrenFlag & ShapeFlags.TEXT_CHILDREN && newChildrenFlag & ShapeFlags.TEXT_CHILDREN) {
                return hostSetElementText(container, newChildren);
            }

            //原来文本 现在数组
            if (oldChildrenFlag & ShapeFlags.TEXT_CHILDREN && newChildrenFlag & ShapeFlags.ARRAY_CHILDREN) {
                // 清空文本
                hostSetElementText(container, '');
                // 添加 新数组
                for (let i = 0; i < newChildren.length; i++) {
                    const childNode = normalizeVNode(newChildren[i]);
                    newChildren[i] = childNode;
                    patch(null, childNode, container, anchor);
                }

                return;
            }

            //原来数组 现在文本
            if (oldChildrenFlag & ShapeFlags.ARRAY_CHILDREN && newChildrenFlag & ShapeFlags.TEXT_CHILDREN) {

                // 卸载 原来数组
                for (let i = 0; i < oldChildren.length; i++) {
                    const childNode = oldChildren[i];
                    const shapeFlag = childNode.shapeFlag;
                    if ((shapeFlag & ShapeFlags.ELEMENT) || (shapeFlag & ShapeFlags.COMPONENT)) {

                        unmount(childNode);
                    }

                }

                container.innerHTML = ''
                hostSetElementText(container, newChildren);

                return;

            }

            //原来数组 现在数组
            if (oldChildrenFlag & ShapeFlags.ARRAY_CHILDREN && newChildrenFlag & ShapeFlags.ARRAY_CHILDREN) {

                // diff core
                patchChildrenDiff(container, oldChildren, newChildren, anchor);


            }


        }


    }

    /*
    *
    * diff core
    *
    * */

    function patchChildrenDiff(container, oldChildren, newChildren, anchor = null) {

        /*
        * 特殊情况优化，列表有序
        * 虽然未采用 vue2 的双指针形式， 但是基本思想是近似的，先尽可能排除掉可优化的特殊情况，最后进行乱序比较
        *
        *  1:
        *    a b c
        *    a b
        * 2:
        *   a b c
        *     b c
        *
        * 3:
        *   a b
        *   a b c
        *
        * 4:
        *    b c
        *  a b c
        *
        * */
        // old new 公用 start index
        let startIndex = 0;
        let oldEndIndex = oldChildren.length - 1;
        let newEndIndex = newChildren.length - 1;

        //先从头遍历
        while (startIndex <= newEndIndex && startIndex <= oldEndIndex) {

            const oldNode = oldChildren[startIndex];
            const newNode = newChildren[startIndex];
            if (isSameVNode(oldNode, newNode)) {
                patch(oldNode, newNode, container, anchor);
                startIndex++;
                //有不同 停止遍历
            } else break;

        }

        //前面遍历停止，从尾部开始遍历
        while (startIndex <= newEndIndex && startIndex <= oldEndIndex) {
            const oldNode = oldChildren[oldEndIndex];
            const newNode = newChildren[newEndIndex];
            if (isSameVNode(oldNode, newNode)) {
                patch(oldNode, newNode, container, anchor);
                oldEndIndex--;
                newEndIndex--;
            } else break;

        }


        //前后遍历都结束后 判断特殊情况
        /*
        * 原来多 后来少
        *
        * 1:
        *    a b c
        *    a b
        * 2:
        *   a b c
        *     b c
        *
        * */
        //新老都遍历完 结束
        if (startIndex > newEndIndex && startIndex > oldEndIndex) return;
        // 新的完全遍历结束 ,老的还有,卸载老的
        if (startIndex > newEndIndex && startIndex <= oldEndIndex) {

            for (let i = startIndex; i <= oldEndIndex; i++) {

                unmount(oldChildren[i]);

            }

            return;

        }

        // 新的还有，老的遍历完了 添加新的
        /*
        *  3:
        *   a b
        *   a b c
        *
        * 4:
        *    b c
        *  a b c
        * */

        if (startIndex <= newEndIndex && startIndex > oldEndIndex) {
            // null undefined 直接添加
            let anchor = newChildren[newEndIndex + 1];
            anchor = isNo(anchor) ? null : anchor.el;
            for (let i = startIndex; i <= newEndIndex; i++) {
                patch(null, newChildren[i], container, anchor);
            }

            return;

        }

        // 乱序 新老都没有遍历完

        if (startIndex <= newEndIndex && startIndex <= oldEndIndex) {

            const newKeyToIndex = new Map();

            // 用新的 构建 key-index map

            for (let j = startIndex; j <= newEndIndex; j++) {
                const {key} = newChildren[j];
                newKeyToIndex.set(key, j);
            }

            //从老的中找到与新的匹配的 可复用的节点
            const toBePatchedLength = newEndIndex - startIndex + 1;
            //相对位置 相对 startIndex
            const newReactiveIndexToOldIndex = new Array(toBePatchedLength).fill(-1);

            for (let k = startIndex; k <= oldEndIndex; k++) {

                const oldVNode = oldChildren[k];
                const matchNewIndex = newKeyToIndex.get(oldVNode.key);
                if (isNo(matchNewIndex)) {
                    // 无用的 卸载
                    unmount(oldVNode);
                } else {

                    newReactiveIndexToOldIndex[matchNewIndex - startIndex] = k;

                    patch(oldVNode, newChildren[matchNewIndex], container, anchor);

                }
            }

            // console.log(newReactiveIndexToOldIndex);

            const lis = getLIS(newReactiveIndexToOldIndex);
            // console.log('lis', lis)
            //倒序插入 才能找到 anchor
            let curIndexOfLIS = lis.length - 1;

            // l为相对位置
            //倒序插入 才能找到 anchor
            for (let l = toBePatchedLength - 1; l >= 0; l--) {

                const vNode = newChildren[startIndex + l];
                const anchor = newChildren[startIndex + l + 1] ? newChildren[startIndex + l + 1].el : null;
                //6 4 5 -1
                // 1 2
                if (newReactiveIndexToOldIndex[l] !== -1) {


                    // 说明老的里有新的可以复用的节点 但是 需要移动位置
                    // 前面 patch 的时候已经引用了 原来的 el

                    // 当可复用老节节点在 lis中  现在位置和原来位置一样 不需要移动
                    if (l === lis[curIndexOfLIS]) curIndexOfLIS--;
                    // 可复用节点需要移动
                    else hostInsert(vNode.el, container, anchor);
                    // hostInsert(vNode.el, container, anchor);


                } else {

                    //在该有的位置处 添加
                    patch(null, vNode, container, anchor);
                }


            }


        }


    }


    function patchProps(el, oldProps, newProps) {

        Object.entries(newProps).forEach(([prop, value]) => {
            const oldV = oldProps[prop];
            if (value !== oldProps[prop]) patchProp(el, prop, oldV, value);

        })

        Object.entries(oldProps).forEach(([prop, value]) => {
            const newV = newProps[prop];
            if (isNo(newV)) patchProp(el, prop, value, null);

        })


    }

    function processComponent(oldVNode, newVNode, container) {

        //初次渲染 component mount
        if (isNo(oldVNode)) {

            mountComponent(newVNode, container);

        } else {

            // todo...
            console.log('todo component update');
        }


    }

    function processElement(oldVNode, newVNode, container, anchor = null) {

        // console.log('process element')

        //初次渲染 element mount
        if (isNo(oldVNode)) {

            mountElement(newVNode, container, anchor);
        } else {
            // 更新渲染 element update
            const oldProps = oldVNode.props || {};
            const newProps = newVNode.props || {};
            // 共用同类型的 dom 前面已经判断了
            const el = newVNode.el = oldVNode.el;

            patchProps(el, oldProps, newProps);


            //dom diff
            patchChildren(el, oldVNode, newVNode, anchor);

        }


    }

    function processText(oldVNode, newVNode, container, anchor = null) {


        // console.log('process text');

        //初次渲染 text node
        if (isNo(oldVNode)) {
            newVNode.el = hostCreateText(newVNode.children);
            hostInsert(newVNode.el, container, anchor);

        } else {
            const el = newVNode.el = oldVNode.el;
            const oldChildren = oldVNode.children;
            const newChildren = newVNode.children;
            if (oldChildren !== newChildren) hostSetText(el, newChildren);

        }

    }


    function mountElement(vnode, container, anchor = null) {

        const {type, props, children, shapeFlag} = vnode;
        const el = vnode.el = hostCreateElement(type);
        Object.entries(props).forEach(([prop, value]) => patchProp(el, prop, null, value));
        //children是单个文本字符串  直接设置元素的文本内容
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) hostSetElementText(el, children);
        //children是数组，那么需要处理里面的文本字符串和 virtual dom 夹杂的情况，如果直接设置文本，会导致前一个设置的文本内容被覆盖
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {

            for (let i = 0; i < children.length; i++) {
                const childVNode = normalizeVNode(children[i]);
                // 将 String 转换为 文本类 虚拟节点
                children[i] = childVNode;
                patch(null, childVNode, el);
            }

        }

        hostInsert(el, container, anchor);


    }

    function setupComponentRenderEffect(instance, container) {

        instance.update = effect(function componentEffect() {

            const {beforeMount, mounted, beforeUpdate, updated} = instance;


            if (instance.isMounted) {
                // 已渲染,更新操作
                //todo...
                console.log('update component');
                // lifecycle 生命周期
                if (isArray(beforeUpdate)) invokeArrFns(beforeUpdate);

                const oldTree = instance.subtree;
                const instanceProxyToUse = instance.proxy;
                const newTree = instance.render.call(instanceProxyToUse, instanceProxyToUse);
                instance.subtree = newTree;
                patch(oldTree, newTree, container);

                // 考虑 组件异步渲染
                if (isArray(updated)) nextTick(() => invokeArrFns(updated));


            } else {
                //初次渲染
                // lifecycle 生命周期
                if (isArray(beforeMount)) invokeArrFns(beforeMount);

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
                // 考虑组件异步渲染
                if (isArray(mounted)) nextTick(() => invokeArrFns(mounted));

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

    function unmount(vNode) {

        const {shapeFlag} = vNode;

        //是元素 或者文本节点 卸载
        if (shapeFlag & ShapeFlags.ELEMENT || shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostRemove(vNode.el);
            vNode = null;
            return;
        }

        // 组件 卸载  函数组件 状态组件 要区分 todo
        if (shapeFlag & ShapeFlags.COMPONENT) {
            console.log('unmount component');
            //todo...


        }

    }


    function patch(oldVNode, newVNode, container, anchor = null) {

        // console.log(oldVNode,newVNode);

        const {type, shapeFlag} = newVNode;

        if (oldVNode && oldVNode.type !== type) {
            // type 不同 直接替换
            // type 可能是元素 tag字符串 或者 组件对象
            anchor = oldVNode.el.nextSibling;
            unmount(oldVNode);
            oldVNode = null;

        }


        if (type === Text) return processText(oldVNode, newVNode, container);
        if (shapeFlag & ShapeFlags.ELEMENT) return processElement(oldVNode, newVNode, container, anchor);
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