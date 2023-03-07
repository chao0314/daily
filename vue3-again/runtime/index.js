import {Text, Fragment} from "./vnode-type.js";

//vnode = {
//   key:1,
//   type:'div',function(){},Text,Fragment
//   props:{}
//   children:'text'/[vnode1,vnode2]
// }

export function createRenderer(options) {

    const {createElement, createText, setElementText, setText, insert, remove, patchProp} = options;

    const render = function (vnode, container) {

        if (vnode) {

            patch(container._vnode, vnode, container);

        } else {
            //没有 new vnode ,卸载
            unmount(container._vnode);

        }


    }

    function patch(n1, n2, container, anchor = null) {

        console.log('patch', n1, n2)

        // todo ... ? component ?
        if (n1 && n1.type !== n2.type) {
            unmount(n1);
            n1 = null;
        }

        const {type} = n2;

        if (type === Text) {

            if (!n1) {

                const textNode = createText(n2.children);
                n2.el = textNode;
                insert(textNode, container, anchor);

            } else {

                const el = n2.el = n1.el;

                if (n1.children !== n2.children) setText(el, n2.children);
            }

            //vue3 支持 组件
            // 多根 多个子节点
        } else if (type === Fragment) {
            // Fragment 本身就不需要了
            if (!n1) {

                n2.children.forEach(child => patch(null, child, container, anchor));

            } else {

                patchChildren(n1, n2, container);

            }


        } else {
            //普通 element

            if (!n1) {

                mountElement(n2, container, anchor);

                // if (typeof n2.type === 'string') mountElement(n2, container);
                // else {
                //     //todo  mount component
                //
                // }

            } else {

                patchElement(n1, n2);

                // if (typeof n2.type === 'string') patchElement(n1, n2, container);
                // else {
                //     //todo  patch component
                // }

            }

        }

        container._vnode = n2;


    }

    function mountElement(vnode, container, anchor) {

        const el = vnode.el = createElement(vnode.type);

        const {children} = vnode;

        if (typeof children === 'string') setElementText(el, children);
        else if (Array.isArray(children)) children.forEach(vnode => {

            patch(null, vnode, el, anchor);

        })

        if (vnode.props) {

            const props = vnode.props
            for (const p in props) {

                patchProp(el, p, null, props[p]);

            }

        }

        insert(el, container, anchor);


    }

    function patchElement(n1, n2) {
        const el = n2.el = n1.el;
        console.log('patchElement', el);
        const oldProps = n1.props;
        const newProps = n2.props;

        // 走到这里，首先n1 n2 类型相同，先需要 patch props

        for (const p in newProps) {

            patchProp(el, p, oldProps[p], newProps[p]);
        }

        //删除 new props中没有的属性

        for (const p in oldProps) {

            if (p in newProps) continue;

            patchProp(el, p, oldProps[p], null);

        }


        // 普通 element
        patchChildren(n1, n2);


    }

    function patchChildren(n1, n2) {

        const newChildren = n1.children;
        const oldChildren = n2.children;
        const el = n2.el = n1.el;

        console.log('patchChildren', el)

        if (Array.isArray(newChildren)) {

            if (Array.isArray(oldChildren)) {
                //todo dom diff
                patchKeyedChildren(n1, n2, el);

            } else {

                // old children 要么是文本子节点 要么没有子节点
                //清理 后 挂载
                setElementText(el, '');

                newChildren.forEach(child => {

                    //不直接用 mountElement ，因为还有可能是 component
                    patch(null, child, el);

                })

            }

        } else {

            // new children  是文本 或者没有

            if (Array.isArray(oldChildren)) {

                oldChildren.forEach(oldChild => unmount(oldChild));

            }

            // new child 有值就用，没有就清理
            console.log('setElementText', el, newChildren);

            if (oldChildren !== newChildren) setElementText(el, newChildren || '');

        }

    }

    function unmount(vnode) {

        const {type, children} = vnode;
        //element
        if (typeof type === 'string') {

            remove(vnode.el);

        } else if (type === Fragment) {
            // fragment  需要卸载子节点
            children.forEach(chid => unmount(chid));


        } else {


        }


    }

    // 双端 diff  vue2
    function patchKeyedChildren(n1, n2, container) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let oldStartIndex = 0;
        let oldEndIndex = oldChildren.length - 1;
        let newStartIndex = 0;
        let newEndIndex = newChildren.length - 1;
        let oldStartNode = oldChildren[oldStartIndex];
        let oldEndNode = oldChildren[oldEndIndex];
        let newStartNode = newChildren[newStartIndex];
        let newEndNode = newChildren[newEndIndex];

        while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

            // 在乱序中 可能已经被找到，被设置未了 null
            if (!oldStartNode) {
                oldStartNode = oldChildren[++oldStartIndex];
                continue;
            }

            if (!oldEndNode) {
                oldEndNode = oldChildren[--oldEndIndex];
                continue;
            }

            //头-头
            if (newStartNode.key === oldStartNode.key) {

                patch(oldStartNode, newStartNode, container);
                newStartNode = newChildren[++newStartIndex];
                oldStartNode = oldChildren[++oldStartIndex];

                //尾-尾
            } else if (newEndNode.key === oldEndNode.key) {

                patch(oldEndNode, newEndNode, container);
                newEndNode = newChildren[--newEndIndex];
                oldEndNode = oldChildren[--oldEndIndex];
                //头-尾
            } else if (newStartNode.key === oldEndNode.key) {

                patch(oldEndNode, newStartNode, container);
                insert(oldEndNode.el, container, oldStartNode.el);
                newStartNode = newChildren[++newStartIndex];
                oldEndNode = oldChildren[--oldEndIndex];
                //尾-头
            } else if (newEndNode.key === oldStartNode.key) {

                patch(oldStartNode, newEndNode, container);
                insert(oldStartNode.el, container, oldEndNode.el.nextSibling);
                newEndNode = newChildren[--newEndIndex];
                oldStartNode = oldChildren[++oldStartIndex];
                //乱序
            } else {
                //从 旧节点中找符合的
                let matched = null;

                for (let i = oldStartIndex; i <= oldEndIndex; i++) {

                    const oldNode = oldChildren[i];

                    if (newStartNode.key === oldNode.key) {
                        matched = oldNode;

                        patch(matched, newStartNode, container);

                        insert(matched.el, container, oldStartNode.el);

                        oldChildren[i] = null;
                        break;
                    }

                }

                if (!matched) {

                    patch(null, newStartNode, container, oldStartNode.el);

                }

                newStartNode = newChildren[++newStartIndex];

            }
        }
        // 旧节点 还有 卸载

        if (oldStartIndex <= oldEndIndex && newStartIndex > newEndIndex) {

            for (let i = oldStartIndex; i <= oldEndIndex; i++) {

                const oldChild = oldChildren[i];

                if (oldChild) unmount(oldChild);
            }

        }

        //新节点 还有  逐个挂载

        if (oldStartIndex > oldEndIndex && newStartIndex <= newEndIndex) {

            const nextChild = newChildren[newEndIndex + 1];
            let anchor = nextChild ? nextChild.el : null;

            for (let i = 0; i <= newEndIndex; i++) {

                patch(null, newChildren[i], container, anchor);
            }

        }


    }


    const hydrate = function () {
    }
    return {render, hydrate}


}