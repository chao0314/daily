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
        // 组件没有 初始 el ,需要在递归创建时，手动 $mount  见 patch.js
        if (vm.$options.el) vm.$mount(vm.$options.el);

        callLifeCycleHook(vm, 'mounted');

    }

    Vue.prototype.$watch = $watch;

    Vue.prototype.$mount = function (el) {

        const vm = this;

        if (el) {
            let $el = document.querySelector(el);
            if (!$el) throw new Error('invalid el');
            vm.$el = $el;
        }


        if (!vm.$options.render) {

            let template = vm.$options.template;
            if (!template && !vm.$el) throw new Error('need template');
            template = template || vm.$el.outerHTML;
            vm.$options.render = compileToFunction(template);

        }

        mountComponent(vm, vm.$el);

    }


}

