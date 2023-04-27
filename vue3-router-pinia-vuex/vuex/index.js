import {reactive, computed, inject} from "vue";

class Store {

    constructor(options) {

        const store = this;
        store.getters = Object.create(null);
        store.mutations = Object.create(null);
        store.actions = Object.create(null);
        store._rootModule = store._normalizeModules(options);
        store._state = store._installModule(store, store._rootModule);
        store.state = reactive(store._state);

    }

    install(app) {

        app.provide('vuex', this);
        app.config.globalProperties.$store = this;

    }


    commit = (type, payload) => {

        console.log('type', type, this.mutations)
        return this.mutations[type](payload);

    }

    dispatch = (type, payload) => {

        return this.actions[type](payload);

    }

    _normalizeModules(options) {


        return normalize(options);


        function normalize(options, name = '', parentModule = null) {

            const {state = {}, namespaced = false, modules = {}} = options;

            const module = {
                state: reactive(state),
                children: {},
                namespace: '',
                _rawModule: options,

            }

            const parentNamespace = parentModule && parentModule.namespace;
            if (namespaced) {
                module.namespace = parentNamespace ? `${parentNamespace}${name}/` : `${name}/`;

            } else {
                module.namespace = parentNamespace ? `${parentNamespace}` : '';
            }

            for (const [name, childModule] of Object.entries(modules)) {

                module.children[name] = normalize(childModule, name, module);

            }

            return module;
        }


    }

    _installModule(store, module, name = '', parentModule = null) {

        const {namespace = '', state = {}, children = {}} = module;
        const {mutations = {}, actions = {}, getters = {}} = module._rawModule;

        for (const [key, mutation] of Object.entries(mutations)) {

            store.mutations[`${namespace}${key}`] = (payload) => {

                return mutation(state, payload);

            }
        }

        for (const [key, action] of Object.entries(actions)) {

            store.actions[`${namespace}${key}`] = (payload) => {

                const result = action(store, payload);

                if (!(result instanceof Promise)) return Promise.resolve(result);
                return result;

            }

        }

        for (const [key, getter] of Object.entries(getters)) {

            store.getters[`${namespace}${key}`] = computed(() => getter(state));


        }


        for (const [name, childModule] of Object.entries(children)) {

            store._installModule(store, childModule, name, module);

        }


        // 根 module
        if (!parentModule)
            return state;
        else parentModule.state[name] = state;

    }

}

export function createStore(options) {

    return new Store(options);
}

export function useStore() {

    return inject('vuex');
}


// 格式化用户的参数，实现根据自己的需要，后续使用时方便

// root = {
//     _raw:rootModule,
//     state:rootModule.state, // 用户管理
//     _children:{
//         aCount:{ // > 1
//             _raw:aModule,
//             state:aModule.state,
//             _children:{ // > 1
//                 cCount:{
//                     _raw:useCssModule,
//                     state:cModule.state,
//                     _children:{}
//                 }
//             }
//         },
//         bCount:{
//             _raw:bModule,
//             state:bModule.state,
//             _children:{}
//         }
//     }
// }