import initState from "./initState";
import compileToFunction from "./compiler/index";
import {mountComponent} from "./lifecycle";

export default function initOptionsMixin(Vue) {

    Vue.prototype._initOptions = function (options) {
        const vm = this;
        vm.$options = options;

        initState(vm); //init data computed watch ...

        vm.$mount(vm.$options.el);

    }

    Vue.prototype.$mount = function (el) {

        if (!el) return;
        const vm = this;

        let $el = document.querySelector(el);
        if (!$el) throw new Error('invalid el');
        vm.$el = $el;

        if (!vm.$options.render) {

            let template = vm.$options.template;
            if (!template) template = $el.outerHTML;
            vm.$options.render = compileToFunction(template);

        }

        mountComponent(vm, $el);

    }


}

