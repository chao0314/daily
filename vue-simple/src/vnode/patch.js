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

        oldVNode.el.textContent = newVNode.text;
        el = newVNode.el = oldVNode.el;

    } else {
        //只要是同名标签就认为可以复用，此处无需比较 key,key 更多用在子元素列表中
        // 两个虚拟节点是同标签元素，需要处理标签的属性和字节的点
        // 梳理标签属性

        const oldProps = oldVNode.data || {};
        const newProps = newVNode.data || {};
        // 复用 old vnode 的已创建dom 元素
        el = newVNode.el = propsDiffHandler(oldVNode.el, oldProps, newProps);

        // 比对 处理子节点 children
        //todo...
        const oldChildren = oldVNode.children || [];
        const newChildren = newVNode.children || [];

        if (oldChildren.length > 0 && newChildren.length > 0) {

            let oldStartIndex = 0;
            let oldStartNode = oldChildren[oldStartIndex];
            let oldEndIndex = oldChildren.length - 1;
            let oldEndNode = oldChildren[oldEndIndex];
            let newStartIndex = 0;
            let newStartNode = newChildren[newStartIndex];
            let newEndIndex = newChildren.length - 1;
            let newEndNode = newChildren[newEndIndex];

            const keyIndexMap = oldChildren.reduce((preRes, cur, index) => {

                if (cur.key) preRes[cur.key] = index;
                return preRes;
            }, {})

            while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

                //可能在乱序比较时，已经被处理了，留有 null 占位，直接跳过
                if (!oldStartNode) {
                    oldStartNode = oldChildren[++oldStartIndex];
                    continue;
                }

                if (!oldEndNode) {
                    oldEndNode = oldChildren[--oldEndIndex];
                    continue;

                }


                //头头比较  node 相同，那么向后移动头指针，同时更 继续 patch(若无 children其实本质就是处理 props);
                if (equal(newStartNode, oldStartNode)) {
                    patchDomTree(oldStartNode, newStartNode);
                    oldStartNode = oldChildren[++oldStartIndex];
                    newStartNode = newChildren[++newStartIndex];
                    // 尾尾比较
                } else if (equal(newEndNode, oldEndNode)) {
                    patchDomTree(oldEndNode, newEndNode);
                    oldEndNode = oldChildren[--oldEndIndex];
                    newEndNode = newChildren[--newEndIndex];
                    //头尾比较
                } else if (equal(newStartNode, oldEndNode)) {

                    patchDomTree(oldEndNode, newStartNode);
                    el.insertBefore(oldEndNode.el, oldStartNode.el);
                    oldEndNode = oldChildren[--oldEndIndex];
                    newStartNode = newChildren[++newStartIndex];
                    //尾头比较
                } else if (equal(newEndNode, oldStartNode)) {

                    patchDomTree(oldStartNode, newEndNode);
                    //insertBefore(e,null) === appendChild(e)
                    el.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling);
                    oldStartNode = oldChildren[++oldStartIndex];
                    newEndNode = newChildren[--newEndIndex];
                    //乱序比较
                } else {

                    const index = keyIndexMap[newStartNode.key];
                    if (index) {
                        let matchNode =  oldChildren[index];
                        oldChildren[index]=  null;
                        patchDomTree(matchNode,newStartNode);
                        el.insertBefore(matchNode.el,oldStartNode.el);


                    } else {

                        el.insertBefore(createElement(newStartNode), oldStartNode.el);

                    }

                    newStartNode = newChildren[++newStartIndex];


                }


            }

            // while 跳出了
            // 新的已经处理完，旧的有没用到的，删掉
            if(oldStartIndex <=oldEndIndex){


            }

            //新的还没处理完，旧的已无可用，插入
            if(newStartIndex <= newEndIndex){


            }




        } else if (oldChildren.length > 0) {
            //原有，现无，直接删
            el.innerHTML = '';

        } else if (newChildren.length > 0) {
            //原无，现有，直接添

            newChildren.forEach(child => el.appendChild(createElement(child)));


        }


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

    return el;

}

function equal(nodeA, nodeB) {

    return nodeA && nodeB && nodeA.tagName === nodeB.tagName && nodeA.key === nodeB.key;

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

