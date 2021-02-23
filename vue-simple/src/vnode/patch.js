import {isHtmlTag} from "../utils/index";

export default function patchDomTree(oldVNode, newVNode) {

    if (!newVNode) throw new Error('patch dom tree need vnode');
    //'component initial patch dom tree'
    //组件第一次渲染

    if (!oldVNode) {
        // console.log('component init patch dom tree');
        return createElement(newVNode);
    }
    // 整个 vue 第一次渲染
    if (oldVNode.nodeType === 1) {
        //初次渲染 Vue tree  oldVNode 是真实 dom 元素
        let newElement = createElement(newVNode);
        oldVNode.parentElement.replaceChild(newElement, oldVNode);
        return newElement;
    }

    // 组件 dom 树更新 diff
    let el;
    // 标签不同 直接替换元素
    if (oldVNode.tagName !== newVNode.tagName) {
        el = createElement(newVNode);
        oldVNode.el.parentElement.replaceChild(el, oldVNode.el);
    } else if (!oldVNode.tagName) {
        // 是文本节点 直接替换
        el = oldVNode.el;
        el.textContent = newVNode.text;
        newVNode.el = el;

    } else {
        //只要是同名标签就认为可以复用，此处无需比较 key,key 更多用在子元素列表中
        // 两个虚拟节点是同标签元素，需要处理标签的属性和字节的点
        // 梳理标签属性

        const oldProps = oldVNode.data || {};
        const newProps = newVNode.data || {};
        el = createElement(newVNode);
        propsDiffHandler(el, oldProps, newProps);

        // 比对 处理子节点 children
        //todo...


    }

    return el;


}

function propsDiffHandler(el, oldProps, newProps) {

    //清理原 attr 和 style
    Object.entries(oldProps).forEach(([key, value]) => {
        if (key === 'style') {
            const newStyle = newProps[key];
            Object.keys(value).forEach(name => {
                if (!newStyle[name]) el.style[name] = '';
            })
        } else el.removeAttribute(key);

    })

    // 设新值

    Object.entries(newProps).forEach(([key, value]) => {

        if (key === 'style') {
            Object.entries(value).forEach(([k, v]) => el.style[k] = v);
        } else el.setAttribute(key, value);
    })


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

