import {mergeOptions} from "./utils/index";

export default function initGlobal(Vue) {
    Vue.staticOptions = {
        _base: Vue,
        components: {} //注册组件
    };
    Vue.mixin = function (customStaticOptions) {
        this.staticOptions = mergeOptions(this.staticOptions, customStaticOptions);
        return this;

    }

    Vue.extend = function (defOptions) {

        const Vue = this;
        const VueComponent = function (options) {
            this._initOptions(options);
        }
        //原型继承
        VueComponent.prototype = Object.create(Vue.prototype);
        VueComponent.prototype.constructor = VueComponent;
        //合并 全局 static options
        //特殊处理 lifecycle hook 和 components 等
        VueComponent.staticOptions = mergeOptions(Vue.staticOptions, defOptions);

        return VueComponent;

    }

    Vue.component = function (name, defOptions) {

        const Vue = this;
        Vue.staticOptions.components[name] = Vue.extend(defOptions);

    }


}