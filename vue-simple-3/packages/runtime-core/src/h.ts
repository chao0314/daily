import {isObj, isVNode} from "@vue/shared";
import {createVNode} from "./vnode";
//2
// h('div',{a:1});
// h('div',"hello");
// h('div',h('span'));
// h('div',[h('span'),h('span')]);
//3
// h('div',{},'hello world');
// h('div',{},h('span'));
// h('div',{},[h('span'),h('span')]);
// more 3
// h('div',null,h('span'),h('span'));
// h('div',null,'a','b','c');

// children 的具体 patch 挂在处理 会有 renderer中调用 vnode 的 normalizeVNode 进行处理，区分字符串 和 vnode
export function h(tag, props, children) {
    const args = Array.from(arguments);
    if (args.length <= 1) return console.warn('empty node');
    if (args.length === 2) {
        if (isObj(props)) {
            if (isVNode(props)) {
                children = [props];
                return createVNode(tag, null, children);
            } else return createVNode(tag, props, null);

        } else if (Array.isArray(props)) {
            children = props;
            return createVNode(tag, null, children);
        } else {

            return createVNode(tag, null, String(props));
        }

    }
    if (args.length === 3) {
        if (Array.isArray(children)) return createVNode(tag, props, children);
        if (isVNode(children)) return createVNode(tag, props, [children]);
        else return createVNode(tag, props, String(children));


    }
    if (args.length > 3) {
        children = args.slice(2);
        return createVNode(tag, props, children);
    }


}