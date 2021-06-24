import {App, render, h} from "vue";
import Message from "./lib/WMessage.vue";

Message.install = (app: App) => {

    app.component(Message.name, Message);

}

export default Message;

const vNodeCache = [];

type Options = {
    message: string,
    type?: string,
    offset?: number,
}


export function showMessage({message, type, offset}: Options) {

    offset ??= vNodeCache.length + 1;
    const vNode = h(Message, {message, type, offset});
    const container = document.createElement('div');
    render(vNode, container);
    document.body.appendChild(container.firstElementChild);
    vNodeCache.push(vNode);

}