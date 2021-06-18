import {App} from "vue";
import CheckboxGroup from "../checkbox/lib/WCheckboxGroup.vue";

CheckboxGroup.install = (app: App) => {
    app.component(CheckboxGroup.name, CheckboxGroup);
}
export default CheckboxGroup;

