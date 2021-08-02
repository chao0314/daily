import {StoreKey} from "./index";
import ModuleCollection from "./ModuleCollection";
import Module from "./Module";
import {App, reactive, watch} from "vue";

export type  Modules = { [key: string]: any }

export type  StoreOption = {
    state: object,
    mutations: object,
    actions: object,
    getters: object,
    modules?: Modules,
    namespace?: true
}

type _State = {
    data: object,
    [key: string]: any
}


class Store {

    private readonly moduleCollection;
    private _state!: _State;
    private readonly _getters = Object.create(null);
    private readonly _mutations = Object.create(null);
    private readonly _actions = Object.create(null);
    public getters = {};

    constructor(options: StoreOption) {


        this.moduleCollection = new ModuleCollection(options);
        this.installModule(this, this.moduleCollection.rootModule);
        this.resetStore(this, this.moduleCollection.rootModule, this.state);


    }

    get state() {
        return this._state.data;

    }

    install(app: App, key: string) {

        app.provide(key ?? StoreKey, this);
        app.config.globalProperties.$store = this;


    }

    installModule(store: Store, module: Module) {

        const modules = module.getChildModule();
        if (modules) Object.entries(modules).forEach(([key, childModule]: [string, Module]) => {
            module.state[key] = childModule.state;
            if (childModule.getChildModule()) this.installModule(store, childModule);

        })

        //判断是否是根 module
        if (store.moduleCollection.rootModule === module) {

            store._state = reactive({data: module.state});


        }
    }

    resetStore(store: Store, module: Module, reactiveState: { [key: string]: any }) {

        // 这里的 store state 是响应式的，如果直接使用模块上自己的状态，此状态不是响应式的
        const rootState = store.state;

        module.mutationsEach((key: string, mutation: Function) => {

            if (!store._mutations[key]) store._mutations[key] = [];

            store._mutations[key].push((payload: any) => {

                mutation.call(store, reactiveState, payload, rootState);

            })


        })

        module.actionsEach((key: string, action: Function) => {

            if (!store._actions[key]) store._actions[key] = [];

            store._actions[key].push((payload: any) => {

                action.call(store, store, payload);

            })
        })

        module.gettersEach((key: string, getter: Function) => {

            store._getters[key] = () => {

                getter.call(store, reactiveState, store.getters);
            }


        })


        const modules = module.getChildModule();
        if (modules) Object.entries(modules).forEach(([key, childModule]: [string, Module]) => {

            this.resetStore(store, childModule, reactiveState[key]);


        })


        //判断是否是根 module
        if (store.moduleCollection.rootModule === module) {

            Object.entries(store._getters).forEach(([key, getter]) => {

                Object.defineProperty(store.getters, key, {
                    //应该用 computed 才能有缓存，vuex 将来在 vue3.2版本时会修复
                    get: getter as any,
                    enumerable: true
                })

            })


        }


    }


}

export default Store;