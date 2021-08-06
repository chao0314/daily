import {StoreOption} from "./Store";

export type ChildrenModule = { [key: string]: Module };

class Module {

    private readonly _rawModule: StoreOption
    private readonly _childrenModule;
    private readonly _state: { [key: string]: any };
    private _namespaces: string[];

    constructor(rawModule: StoreOption) {
        this._rawModule = rawModule;
        this._state = rawModule.state;
        this._childrenModule = {} as ChildrenModule;
        this._namespaces = [];
    }

    get state() {

        return this._state;
    }


    getChildModule(key?: string) {
        if (key) return this._childrenModule[key];
        else if (Object.keys(this._childrenModule).length > 0) return this._childrenModule;
        return null;
    }

    setChildModule(key: string, module: Module) {

        return this._childrenModule[key] = module;
    }

    setNamespaces(namespaces: string[]) {

        this._namespaces = namespaces;

    }

    getNamespaces() {

        return this._namespaces.join('/');
    }

    getRawNamespaces() {

        return this._namespaces;
    }


    mutationsEach(callback: Function) {

        const namespace = this.getNamespaces();

        Object.entries(this._rawModule.mutations).forEach(([key, mutation]) => {

            const path = namespace ? `${namespace}/${key}` : key;
            callback(path, mutation);


        })


    }

    actionsEach(callback: Function) {

        const namespace = this.getNamespaces();

        Object.entries(this._rawModule.actions ?? {}).forEach(([key, action]) => {

            const path = namespace ? `${namespace}/${key}` : key;
            callback(path, action);


        })


    }

    gettersEach(callback: Function) {

        const namespace = this.getNamespaces();

        Object.entries(this._rawModule.getters ?? {}).forEach(([key, getter]) => {

            const path = namespace ? `${namespace}/${key}` : key;

            callback(path, getter);


        })


    }


}

export default Module;