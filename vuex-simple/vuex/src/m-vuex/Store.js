import Vue from 'vue';
import ModuleCollection from "./ModuleCollection";

class Store {

    constructor(options = {}) {

        this.mutations = {};
        this.actions = {};
        this.getters = {};
        this.gettersWrapper = {};
        this.strict = options.strict;
        this.plugins = [];
        this.moduleCollection = new ModuleCollection(options);
        this.$vm = null;
        this.isCommitting = false;

        this.installModule([], this.moduleCollection.rootModule);
        this.reactiveState();

    }

    get state() {


        return this.$vm ? this.$vm._data.$$data : this.moduleCollection.rootModule.state;


    }

    getSateByPath(path = []) {
        const store = this;
        return path.reduce((parent, path) => parent[path], store.state);

    }

    installModule(path, module) {

        const store = this;
        const ns = this.moduleCollection.getNamespaced(path);
        //各 module 下的 state 依次挂载到上级 state 上。 [a,b,c]
        if (path.length > 0) {
            const parentState = path.slice(0, -1).reduce((parent, path) => parent[path], store.state);
            parentState[path.slice(path.length - 1)] = module.state;
        }

        // mutations

        Object.entries(module.mutations).forEach(([name, handler]) => {
            const key = `${ns}${name}`;
            const queue = store.mutations[key] || [];
            const state = store.getSateByPath(path);


            queue.push(payload => {

                handler.call(store, state, payload)

                this.plugins.forEach(plugin => plugin({key, payload}), state);

            })

            store.mutations[key] = queue;

        })


        // actions


        Object.entries(module.actions).forEach(([name, handler]) => {
            const key = `${ns}${name}`;
            const queue = store.actions[key] || [];

            queue.push(payload => {

                handler.call(store, store, payload)

            })

            store.actions[key] = queue;

        })


        //getters

        Object.entries(module.getters).forEach(([name, handler]) => {
            const key = `${ns}${name}`;
            const state = store.getSateByPath(path);

            this.gettersWrapper[key] = () => handler.call(store, state);


        })


        // todo... about children module

        module.childrenMap.forEach((module, key) => {

            this.installModule(path.concat(key), module);

        })


    }

    reactiveState() {

        const store = this;
        const oldVm = this.$vm;
        const computed = {}
        Object.entries(this.gettersWrapper).forEach(([name, handler]) => {

            computed[name] = handler;

            Object.defineProperty(store.getters, name, {
                get() {

                    return store.$vm[name];
                }

            })
        })

        this.$vm = new Vue({
            data: {
                $$data: store.state
            },
            computed

        })
        if (oldVm) oldVm.$destroy();

        if (store.strict) {

            this.$vm.$watch(() => this.$vm._data.$$data, () => {
                console.assert(store.isCommitting, 'mutate outside !!!');
            }, {deep: true, sync: true})

        }


    }

    commit = (name, payload) => {

        this.isCommitting = true;
        this.mutations[name] && this.mutations[name].forEach(handler => handler(payload));
        this.isCommitting = false;
    }

    dispatch = (name, payload) => {

        this.actions[name] && this.actions[name].forEach(handler => handler(payload));
    }

    replaceState(newState) {

        this.isCommitting = true;
        this.$vm._data.$$data = newState;
        this.isCommitting = false

    }

    registerModule(path = [], rawModule) {

        if (typeof path === 'string') path = [path];

        let module = this.moduleCollection.registerModule(path, rawModule);
        this.installModule(path, module);
        this.reactiveState();

    }

    subscribe(plugin) {

        if (plugin instanceof Function) this.plugins.push(plugin);

    }


}

export default Store;