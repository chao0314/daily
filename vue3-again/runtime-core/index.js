export function createRenderer(options) {

    const {createElement, setElementText, insert, remove, patchProp} = options;

    //vnode = {
    //   type:'div',function(){}
    //   children:'text',[]
    // }
    const render = function (vnode, container) {

        if (vnode) {

            patch(container._vnode, vnode, container);

        } else {
            //没有 new vnode ,卸载

            unmount(container._vnode, container);

        }


    }


    function patch(n1, n2, container) {

        // todo ... ? component ?
        if (n1 && n1.type !== n2.type) {

            unmount(n1, container);
            n1 = null;
        }

        if (!n1) {

            if (typeof n2.type === 'string') mountElement(n2, container);
            else {
                //todo  mount component

            }

        } else {

            if (typeof n2.type === 'string') patchElement(n1, n2, container);
            else {
                //todo  patch component
            }

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


    }

    function unmount(vnode, container) {

        //element
        if (typeof vnode.type === 'string') {

            remove(vnode.el, container);

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