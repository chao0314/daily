// @ts-ignore
import {App} from "vue";
import Button from "./lib/WButton.vue";

Button.install = (app: App): void => {
    app.component(Button.name, Button);

}

export default Button;

