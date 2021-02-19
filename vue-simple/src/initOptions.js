import initState, {$watch} from "./initState";
import compileToFunction from "./compiler/index";
import {mountComponent, callLifeCycleHook} from "./initLifecycle";
import {mergeOptions} from "./utils/index";

export default function initOptionsMixin(Vue) {

    Vue.prototype._initOptions = function (options) {
        const vm = this;
        //Vue 或 子组件构造函数
        vm.$options = mergeOptions(vm.constructor.staticOptions, options);

        callLifeCycleHook(vm, 'beforeCreate');

        initState(vm); //init data computed watch ...

        callLifeCycleHook(vm, 'created');

        vm.$mount(vm.$options.el);

        callLifeCycleHook(vm, 'mounted');

    }

    Vue.prototype.$watch = $watch;

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

