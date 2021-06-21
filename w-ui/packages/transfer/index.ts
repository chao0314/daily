import {App} from "vue";
import Transfer from "./lib/WTransfer.vue";
Transfer.install = (app:App)=>{

    app.component(Transfer.name,Transfer);
}

export default Transfer;


