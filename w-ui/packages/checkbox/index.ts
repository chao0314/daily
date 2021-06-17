import {App} from "vue";
import Checkbox from "./lib/WCheckbox.vue";

Checkbox.install = (app: App) => {
    app.component(Checkbox.name, Checkbox);
}

export default Checkbox;