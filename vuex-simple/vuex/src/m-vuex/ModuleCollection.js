import Module from "./Module";

class ModuleCollection {

    constructor(rawModule = {}) {

        this.rootModule = null;
        this.registerModule([], rawModule);


    }

    registerModule(path = [], rawModule) {

        const module = new Module(rawModule);

        if (path.length > 0) {
            //[a,b,c]
            const parentModule = path.slice(0, -1).reduce((parent, path) => parent[path], this.rootModule);

            parentModule.setChildModule(path[(path.length - 1)], module);

        } else this.rootModule = module;


        if (rawModule.modules) {

            Object.entries(rawModule.modules).forEach(([name, raw]) => this.registerModule(path.concat(name), raw));


        }


        return module;


    }

    getNamespaced(path = []) {

        let ns = '';

        path.reduce((parent, name) => {
            const module = parent.getChildModule(name);
            if (module.namespaced) ns += `${name}/`;
            return module;

        }, this.rootModule)

        return ns;

    }
}


export default ModuleCollection;