import {App} from "vue";
import Icon from "./lib/WIcon.vue";

Icon.install = (app: App): void => {

    app.component(Icon.name,Icon);

}

export default Icon;

