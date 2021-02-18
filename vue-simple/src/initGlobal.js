import {mergeOptions} from "./utils/index";

export default function initGlobal(Vue) {
    Vue.staticOptions = {};
    Vue.mixin = function (customStaticOptions) {
        this.staticOptions = mergeOptions(this.staticOptions, customStaticOptions);
        return this;

    }


}