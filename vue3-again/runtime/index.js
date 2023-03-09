import {Text, Fragment} from "./vnode-type.js";
import {lis} from "./lis/lis.js";

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
                // patchKeyedChildren(n1, n2, el);

                patchKeyedChildrenV3(n1, n2, el);

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

            //patch后 new old 就共用 el 了
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

                    //也可以用 newEndNode  后尾插入 todo
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


    // 最长递增子序列 vue3
    function patchKeyedChildrenV3(n1, n2, container) {


        const oldChildren = n1.children;
        const newChildren = n2.children;
        let oldStart = 0;
        let newStart = 0;
        let oldEnd = oldChildren.length - 1;
        let newEnd = newChildren.length - 1;

        //预处理 理想情况，头尾 相同的节点
        while (oldStart <= oldEnd && newStart <= newEnd) {

            const oldStartNode = oldChildren[oldStart];
            const newStartNode = newChildren[newStart];
            const oldEndNode = oldChildren[oldEnd];
            const newEndNode = newChildren[newEnd];

            if (oldStartNode.key !== newStartNode.key && oldEndNode.key !== newEndNode.key)
                break;

            if (oldStartNode.key === newStartNode.key) {

                patch(oldStartNode, newStartNode, container);
                oldStart++;
                newStart++
            }


            if (oldEndNode.key === newEndNode.key) {

                patch(oldEndNode, newEndNode, container);
                oldEnd--;
                newEnd--;

            }

        }

        // 最理想情况  都遍历完 不需要移动 结束
        if (oldStart > oldEnd && newStart > newEnd) return;
        //旧的遍历完 新的还有 挂载新的
        if (oldStart > oldEnd && newStart <= newEnd) {

            const anchor = newChildren[newEnd + 1] ? newChildren[newEnd + 1].el : null;

            for (let i = newStart; i <= newEnd; i++) {

                patch(null, newChildren[i], container, anchor);

            }

            //旧的还有 新的遍历完 卸载旧的
        } else if (oldStart <= oldEnd && newStart > newEnd) {

            for (let i = oldStart; i <= oldEnd; i++) {

                unmount(oldChildren[i]);

            }

            // 旧的 新的 都没有遍历完
        } else {

            //从旧的里 找能复用的节点，不能复用的节点 直接卸载
            let needMoved = false;
            let newPos = newStart;
            const newKeyIndexRecord = {};
            //记录新节点 与 能复用的 旧节点之间的 下标对应关系，便于后面 lis的查找
            //没有找到复用的节点是 -1
            const sequence = new Array(newEnd - newStart + 1).fill(-1);

            for (let i = newStart; i <= newEnd; i++) {
                const node = newChildren[i];
                newKeyIndexRecord[node.key] = i;

            }

            for (let j = oldStart; j <= oldEnd; j++) {

                const oldNode = oldChildren[j];

                const newIndex = newKeyIndexRecord[oldNode.key];

                //这个旧节点 不能复用 卸载
                if (newIndex === void 0) {
                    unmount(oldNode);

                } else {

                    patch(oldNode, newChildren[newIndex], container);
                    sequence[newIndex - newStart] = j;

                    //能复用节点对应的新节点的索引 比前面的新节点索引值小，说明索引值不是递增的，
                    // 复用节点的原顺序需要移动
                    if (!needMoved && newPos > newIndex) needMoved = true;
                    newPos = newIndex;

                }


            }


            if (needMoved) {

                // 返回的是sequence的下标值数组
                console.log(sequence)
                const indexLis = lis(sequence);
                console.log(indexLis)
                let lisEnd = indexLis.length - 1;

                // 此处 倒序插入 更简便 故采用倒序，因为倒序 anchor 好找

                for (let i = sequence.length - 1; i >= 0; i--) {

                    const sequenceValue = sequence[i];

                    // 没有找到可复用的旧节点 需要挂载
                    if (sequenceValue === -1) {
                        // sequence的下标 是 newStart的相对下标
                        // sequence 里存的是 可复用节点的在 oldChildren中的下标值
                        const realIndex = i + newStart;

                        const anchor = newChildren[realIndex + 1] ? newChildren[realIndex + 1].el : null;

                        patch(null, newChildren[realIndex], container, anchor);

                        //刚好对应上了可复用的最长递增子序列 不需要移动
                        // 已经 patch过了 ，在查找可复用节点的时候
                    } else if (sequenceValue === sequence[indexLis[lisEnd]]) {

                        lisEnd--;

                        //需要移动的复用节点
                    } else {

                        const realIndex = i + newStart;

                        const anchor = newChildren[realIndex + 1] ? newChildren[realIndex + 1].el : null;

                        insert(oldChildren[sequenceValue].el, container, anchor);

                    }


                }


            }


        }


    }


    const hydrate = function () {
    }
    return {render, hydrate}


}