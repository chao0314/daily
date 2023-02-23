// @ts-ignore
import {App, render, h, ref} from "vue";
import Message from "./lib/WMessage.vue";

Message.install = (app: App) => {

    app.component(Message.name, Message);

}

export default Message;

let vNodeCache = [];
// let containerCache = [];

type Options = {
    message: string,
    type?: string,
    offset?: number,
    duration?: number,
    onClose?: (e: HTMLElement) => void
}


export function showMessage({message, type, offset, duration, onClose}: Options) {

    let container = document.createElement('div');

    offset ??= vNodeCache.length + 1;


    const handleClosed = (el) => {

        vNodeCache = vNodeCache.filter(vNode => vNode.el !== el);
        console.log("closed", vNodeCache.length)
        onClose?.(el);
        //渲染后 container 上有_vnode属性
        render(null, container);

        vNodeCache.forEach((vNode, index) => {

            vNode.component?.ctx?.setOffset(index + 1);


        });

        container = null;


    }


    const vNode = h(Message as {}, {message, type, offset, duration, handleClosed});
    //渲染后 container 上有_vnode属性
    render(vNode, container);
    document.body.appendChild(container.firstElementChild);
    vNodeCache.push(vNode);
    // containerCache.push(container);
    // console.log(vNode === container._vnode);

}