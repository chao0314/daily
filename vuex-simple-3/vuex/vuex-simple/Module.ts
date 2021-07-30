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


    mutationsEach(){


    }

    actionsEach(){


    }

    gettersEach(){


    }


}

export default Module;