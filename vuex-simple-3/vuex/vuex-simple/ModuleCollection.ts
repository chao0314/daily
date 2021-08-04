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


    hotRegisterModule(path: string[], rawModule: StoreOption) {

        const hotModule = new Module(rawModule);
        const key = path[path.length - 1];
        const parentPath = path.slice(0, path.length - 1);

        const parentModule = parentPath.reduce((parent: Module, path: string) => {

            const module = parent.getChildModule(path);
            if (!module) throw  new Error("module path error");
            return module as Module;

        }, this.rootModule);

        parentModule.setChildModule(key, hotModule);
        console.log("hot",parentModule)
        if (rawModule.namespace) hotModule.setNamespaces([...parentModule.getRawNamespaces(), key]);


    }
}

export default ModuleCollection;
