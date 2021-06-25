import {App, render, h, ref} from "vue";
import Message from "./lib/WMessage.vue";

Message.install = (app: App) => {

    app.component(Message.name, Message);

}

export default Message;

// let vNodeCache = [];
let containerCache = [];

type Options = {
    message: string,
    type?: string,
    offset?: number,
    duration?: number,
    onClose?: (e: HTMLElement) => void
}


export function showMessage({message, type, offset, duration, onClose}: Options) {

    let container = document.createElement('div');

    offset ??= containerCache.length + 1;


    const handleClosed = (el) => {

        // vNodeCache = vNodeCache.filter(vNode => vNode.el !== el);
        containerCache = containerCache.filter(value => value !== container);
        onClose?.(el);

        render(null, container);
        containerCache.forEach((container, index) => {

            offset = index + 1;

            const newVNode = h(Message, {message, type, offset, duration, handleClosed})
            //contaner._vnode 为原 vnode
            render(newVNode,container);

        });

        container = null;


    }


    const vNode = h(Message, {message, type, offset, duration, handleClosed});
    //渲染后 container 上有_vnode属性
    render(vNode, container);
    document.body.appendChild(container.firstElementChild);
    // vNodeCache.push(vNode);
    containerCache.push(container);
    // console.log(vNode === container._vnode);

}