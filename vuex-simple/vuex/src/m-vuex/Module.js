class Module {

    constructor(rawModule) {

        this.rawModule = rawModule;
        this.childrenMap = new Map();
        this.state = rawModule.state;
        this.namespaced = rawModule.namespaced;

    }

    setChildModule(name, module) {
        this.childrenMap.set(name, module);

    }

    getChildModule(name) {

        return this.childrenMap.get(name);
    }

    get mutations() {

        return this.rawModule.mutations || {};

    }

    get actions() {

        return this.rawModule.actions || {};
    }

    get getters() {

        return this.rawModule.getters || {};
    }
}


export default Module;