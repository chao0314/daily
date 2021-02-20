import {isHtmlTag} from "../utils/index";

export default function patchDomTree(oldVNode, newVNode) {
    if (!newVNode) throw new Error('patch dom tree need vnode');
    //'component initial patch dom tree'
    if (!oldVNode) {
        // console.log('component init patch dom tree');

        return createElement(newVNode);


    }

    if (oldVNode.nodeType === 1) {
        //初次渲染 Vue tree  oldVNode 是真实 dom 元素
        let newElement = createElement(newVNode);
        oldVNode.parentElement.replaceChild(newElement, oldVNode);
        return newElement;
    }


}

function createElement(vnode) {

    //data 近似 props
    let {tagName, data, children, text, componentOptions} = vnode;
    let el;
    if (tagName) {
        if (isHtmlTag(tagName)) {
            el = document.createElement(tagName);
            children && children.forEach(child => el.appendChild(createElement(child)));
        } else {
            // 是 component  组件
            // console.log('is component', tagName);
            const {VueComponent} = componentOptions;
            const vm = new VueComponent({isComponent: true});
            vnode.componentOptions.instance = vm;
            vm.$mount();
            el = vm.$el;
        }


    } else {

        el = document.createTextNode(text);
    }

    vnode.el = el;
    return vnode.el;

}

