import {Text, Fragment} from "./vnode-type.js";

export function createRenderer(options) {

    const {createElement, createText, setElementText, setTextNodeValue, insert, remove, patchProp} = options;

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

        if (!n1) {

            mountElement(n2, container);

            // if (typeof n2.type === 'string') mountElement(n2, container);
            // else {
            //     //todo  mount component
            //
            // }

        } else {

            patchElement(n1, n2, container);

            // if (typeof n2.type === 'string') patchElement(n1, n2, container);
            // else {
            //     //todo  patch component
            // }

        }

        container._vnode = n2;


    }

    function mountElement(vnode, container) {

        const el = vnode.el = createElement(vnode.type);

        const {children} = vnode;

        if (typeof children === 'string') setElementText(el, children);
        else if (Array.isArray(children)) children.forEach(vnode => {

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


    function patchElement(n1, n2, container) {

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

        if (n2.type === Text) {

            //todo

        } else if (n2.type === Fragment) {

            //todo

        } else {
            // 普通 element

            patchChildren(n1, n2, container);
        }


    }

    function patchChildren(n1, n2, container) {

        const newChildren = n1.children;
        const oldChildren = n2.children;


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