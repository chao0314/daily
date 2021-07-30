import Module from "./Module";
import {StoreOption, Modules} from './Store';

class ModuleCollection {
    public readonly rootModule;

    constructor(options: StoreOption) {

        this.rootModule = new Module(options);

        if (options.modules) this.registerModule(this.rootModule, options.modules, []);

    }


    registerModule(parent: Module, childrenModules: Modules, path: string[]) {

        Object.entries(childrenModules).forEach(([key, rawModule]: [string, StoreOption]) => {

            const module = new Module(rawModule);
            if (rawModule.namespace) module.setNamespaces([...path, key]);
            parent.setChildModule(key, module);

            if (rawModule.modules) this.registerModule(module, rawModule.modules, [...path, key]);

        })

    }
}

export default ModuleCollection;
