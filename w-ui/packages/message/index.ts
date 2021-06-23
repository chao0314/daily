import {App} from "vue";
import Message from "./lib/WMessage.vue";

Message.install = (app: App) => {

    app.component(Message.name, Message);

}

export default Message;

const  Ma