import {Text, Fragment} from "./vnode-type.js";

export function createRenderer(options) {

    const {createElement, createText, setElementText, setText, insert, remove, patchProp} = options;

    //vnode = {
    //   type:'div',function(){},Text,Fragment
    //   props:{}
    //   children:'text',[]
    // }
    const render = function (vnode, container) {

        if (vnode) {

            patch(container._vnode, vnode, container);

        } else {
            //没有 new vnode ,卸载

            unmount(container._vnode);

        }


    }


    function patch(n1, n2, container) {

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
                insert(textNode, container);

            } else {

                const el = n2.el = n1.el;

                setText(el, n2.children);
            }

        //vue3 支持 组件
            // 多根
        } else if (type === Fragment) {

            if(!n1){


            }else {



            }


        } else {
            //普通 element

            if (!n1) {

                mountElement(n2, container);

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


    }

    function mountElement(vnode, container) {

        const el = vnode.el = createElement(vnode.type);

        const {children} = vnode;

        if (typeof children === 'string') setElementText(el, children); else if (Array.isArray(children)) children.forEach(vnode => {

            patch(null, vnode, el);

        })

        if (vnode.props) {

            const props = vnode.props
            for (const p in props) {

                patchProp(el, p, null, props[p]);

            }

        }

        insert(el, container);


    }


    function patchElement(n1, n2) {

        const el = n2.el = n1.el;
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

        if (Array.isArray(newChildren)) {

            if (Array.isArray(oldChildren)) {
                //todo dom diff

            } else {

                // old children 要么是文本子节点 要么没有子节点
                //清理
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
            setElementText(el, newChildren || '');


        }


    }


    function unmount(vnode) {

        //element
        if (typeof vnode.type === 'string') {

            remove(vnode.el);

        } else {


            // todo...
            //卸载 组件


        }

        container._vnode = null;

    }


    const hydrate = function () {
    }
    return {render, hydrate}


}