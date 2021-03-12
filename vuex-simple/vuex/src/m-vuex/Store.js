import Vue from 'vue';
import ModuleCollection from "./ModuleCollection";

class Store {

    constructor(options = {}) {

        this.mutations = {};
        this.actions = {};
        this.getters = {};
        this.gettersWrapper = {};
        this.strict = options.strict;
        this.moduleCollection = new ModuleCollection(options);
        this.$vm = null;

        this.installModule([], this.moduleCollection.rootModule);

    }

    get state() {

        return this.$vm ? this.$vm._data.$$store : this.moduleCollection.rootModule.state;


    }

    getSateByPath(path = []) {
        const store = this;
        return path.reduce((parent, path) => parent[path], store.state);

    }

    installModule(path, module) {

        const store = this;
        const ns = this.moduleCollection.getNamespace(path);
        //各 module 下的 state 依次挂载到上级 state 上。 [a,b,c]
        if (path.length > 0) {
            const parentState = path.slice(0, -1).reduce((parent, path) => parent[path], store.state);
            parentState[path.slice(path.length - 1)] = module.state;
        }

        // mutations

        module.mutations.entries(([name, handler]) => {
            const key = `${ns}${name}`;
            const queue = store.mutations[key] || [];
            const state = store.getSateByPath(path);

            queue.push(payload => {

                handler.call(store, state, payload)

            })

            store.mutations[key] = queue;

        })


        // actions


        module.actions.entries(([name, handler]) => {
            const key = `${ns}${name}`;
            const queue = store.actions[key] || [];

            queue.push(payload => {

                handler.call(store, store, payload)

            })

            store.actions[key] = queue;

        })


        //getters

        module.getters.entries(([name, handler]) => {
            const key = `${ns}${name}`;
            const state = store.getSateByPath(path);

            this.gettersWrapper[key] = () => handler.call(store, state);


        })

        const computed = {}
        this.gettersWrapper.entries(([name, handler]) => {

            computed[name] = handler;

            Object.defineProperty(store.getters, name, {
                get() {

                    return this.$vm[name];
                }

            })
        })

    // todo... about children module



        const oldVm = this.$vm;

        this.$vm = new Vue({
            data: {
                $$data: store.state
            },
            computed

        })


    }


}

export default Store;