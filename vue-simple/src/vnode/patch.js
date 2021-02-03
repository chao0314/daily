export default function patchDomTree(oldVNode, newVNode) {

    if (oldVNode.nodeType === 1) {
        //初次渲染  oldVNode 是真实 dom 元素
        let newElement = createElement(newVNode);
        oldVNode.parentElement.replaceChild(newElement, oldVNode);
        return newElement;
    }


}

function createElement(vnode) {

    let {tagName, data, children, text,} = vnode;
    let el;
    if (tagName) {
        el = document.createElement(tagName);
        children.forEach(child => el.appendChild(createElement(child)));
    } else {

        el = document.createTextNode(text);
    }

    vnode.el = el;
    return vnode.el;

}

