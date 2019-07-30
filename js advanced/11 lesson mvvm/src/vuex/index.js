import {assert, clone, compare} from "../utils";

class Store {
    constructor(option) {
        this.context = null;
        this.time = null;
        this.strict = option.strict || false;
        this.state = option.state || {};
        this._mutations = option.mutations || {};
        this._actions = option.actions || {};
        this._getters = option.getters || {};
        this.initGetters();
        if (this.strict) {
            this.stateSnapShot = clone(this.state);
            this.time = setTimeout(this.compareSnapShot.bind(this), 1000);
        }

    }

    dispatch(name, payload) {
        return this.handleAction(name, payload);
    }

    async handleAction(name, payload) {
        let action = this._actions[name];
        assert(action);
        return await action(this, payload);
    }

    commit(name, payload) {
        let mutation = this._mutations[name];
        assert(mutation);
        mutation(this.state, payload);
        //todo refresh
        this.initGetters();
        this.context.render();
        if (this.strict) this.stateSnapShot = clone(this.state);
    }

    initGetters() {
        let getters = this._getters;
        this.getters = {};
        for (let prop in getters) {
            if (getters.hasOwnProperty(prop)) {
                this.getters[prop] = getters[prop](this.state);
            }
        }
    }

    compareSnapShot() {
        clearTimeout(this.time);
        if (!compare(this.stateSnapShot, this.state)) {
            console.error("illegal set vuex state");
            this.stateSnapShot = clone(this.state);
        }
        this.time = setTimeout(this.compareSnapShot.bind(this), 1000);
    }
}

export let Vuex = Store;


