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

    constructor(options: StoreOption) {

        this.moduleCollection = new ModuleCollection(options);
        this.installState(this, this.moduleCollection.rootModule);

        // todo...
        // this.state = this.moduleCollection.rootModule.state;


    }

    get state() {
        return this._state.data;

    }

    install(app: App, key: string) {

        app.provide(key ?? StoreKey, this);
        app.config.globalProperties.$store = this;


    }

    installState(store: Store, module: Module) {

        const modules = module.getChildModule();
        if (modules) Object.entries(modules).forEach(([key, childModule]: [string, Module]) => {
            module.state[key] = childModule.state;
            if (childModule.getChildModule()) this.installState(store, childModule);

        })

        //判断是否是跟 module
        if (this.moduleCollection.rootModule === module) {

            store._state = reactive({data: module.state});




        }
    }


}

export default Store;