import {StoreKey} from "./index";
import ModuleCollection from "./ModuleCollection";
import Module from "./Module";
import {App, reactive, watch} from "vue";

export type  Modules = { [key: string]: any }

export type  StoreOption = {
    state: object,
    mutations: object,
    actions?: object,
    getters?: object,
    modules?: Modules,
    namespace?: boolean,
    strict?: boolean,
    plugins?: Function[]
}

type _State = {
    data: object,
    [key: string]: any
}

type Action = (payload: any) => Promise<any>

class Store {

    private readonly moduleCollection;
    private _state!: _State;
    private readonly _getters = Object.create(null);
    private readonly _mutations = Object.create(null);
    private readonly _actions = Object.create(null);
    public getters!: object;
    private isCommiting = false;
    private readonly isStrict;
    private readonly plugins: Function[];
    private readonly subscribes: Function[] = [];

    constructor(options: StoreOption) {

        this.isStrict = options.strict ?? false;
        this.plugins = options.plugins ?? [];

        this.moduleCollection = new ModuleCollection(options);
        this.installModule(this, this.moduleCollection.rootModule);
        this.resetStore(this, this.moduleCollection.rootModule, this.state);
        //插件执行
        this.plugins.forEach(plugin => plugin(this));


    }

    get state() {
        return this._state.data;

    }

    subscribe(callback: Function) {

        this.subscribes.push(callback);

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

            // 多嵌套一层 data 就是为了后续 replaceState的时候好改，直接替换即可

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

                try {
                    let res = action.call(store, store, payload);
                    if (!(res instanceof Promise)) res = Promise.resolve(res);
                    return res;
                } catch (e) {

                    return Promise.reject(e);

                }


            })
        })

        module.gettersEach((key: string, getter: Function) => {

            store._getters[key] = () => {

                return getter.call(store, reactiveState, store.getters);
            }


        })


        const modules = module.getChildModule();
        if (modules) Object.entries(modules).forEach(([key, childModule]: [string, Module]) => {

            this.resetStore(store, childModule, reactiveState[key]);


        })


        //判断是否是根 module
        if (store.moduleCollection.rootModule === module) {

            store.getters = Object.create(null);

            Object.entries(store._getters).forEach(([key, getter]) => {

                Object.defineProperty(store.getters, key, {
                    //应该用 computed 才能有缓存，vuex 将来在 vue3.2版本时会修复
                    get: getter as any,
                    enumerable: true
                })

            })

            if (this.isStrict) this.enableStrictMode();

        }
    }

    private enableStrictMode() {

        watch(() => this.state, () => {

            console.assert(this.isCommiting, 'do not mutate vuex store state outside mutation handlers');

        }, {deep: true, flush: 'sync'})
    }

    private withCommiting(callback: Function) {

        this.isCommiting = true;
        callback();
        this.isCommiting = false;

    }


    commit = (mutationName: string, payload: any) => {

        const store = this;

        store.withCommiting(() => {

            store._mutations[mutationName].forEach((mutation: Function) => mutation(payload));
        })

        store.subscribes.forEach(callback => callback({type: mutationName, payload}, store.state));


    }


    dispatch = (actionName: string, payload: any) => {

        const store = this;

        const actionsPromise = store._actions[actionName].map((action: Action) => action(payload));

        return Promise.all(actionsPromise);

    }

    replaceState(newState: { [key: string]: any }) {

        console.log("replace state", newState)

        const store = this;
        // 严格模式下 不能直接修改状态
        store.withCommiting(() => {
            store._state.data = newState;
            store.resetStore(store, store.moduleCollection.rootModule, store.state);

        })

    }


    registerModule(path: string[] | string, rawModule: StoreOption) {

        const store = this;
        if (typeof path === 'string') path = [path];

        store.moduleCollection.hotRegisterModule(path, rawModule);
        // store.installModule(store, store.moduleCollection.rootModule);
        store.resetStore(store, store.moduleCollection.rootModule, store.state);


    }


}


export default Store;