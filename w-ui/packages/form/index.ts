import {App} from "vue";
import WFrom from './lib/WForm.vue';
import WFormItem from './lib/WFormItem.vue';

WFrom.install = (app: App) => {

    app.component(WFrom.name, WFrom);
}

WFormItem.install = (app: App) => {
    app.component(WFormItem.name, WFormItem);

}

export const Form = WFrom;
export const FormItem = WFormItem;


