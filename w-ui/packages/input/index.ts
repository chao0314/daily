import {App} from "vue";
import Input from "./lib/WInput.vue";
Input.install =  (app:App)=>{
    app.component(Input.name,Input);
}
export default Input;

