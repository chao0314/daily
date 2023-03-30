export const Teleport = {
    name: 'Teleport',
    _isTeleport: true,

    process(n1, n2, internalOperations) {

        const {queryElement, insert, mountElement, patchElement} = internalOperations;
        const {to} = n2.props
        const container = typeof to === 'string' ? queryElement(to) : to;

        if (!n1) {
            //挂载 n2

            const childVNode = n2.children.default();

            // todo... 目前只能挂一个，后面再挂 就会覆盖 container._vnode
            mountElement(childVNode, container);

            n2.childVNode = childVNode;


        } else {

            //更新
            console.log(n1, n2);
            const oldChildVNode = n1.childVNode;
            const newChildVNode = n2.children.default();

            patchElement(oldChildVNode, newChildVNode);

            //有可能 to 改变了，例如 虽然子组件没有变化，但是 to 被定位到了其他位置
            //移动
            if (n1.props.to !== n2.props.to) {
                insert(newChildVNode.el, container);
            }


        }


    }


}