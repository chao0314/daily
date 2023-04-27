import {
    reactive, computed, effectScope, getCurrentInstance,
    inject, isProxy, isRef, toRefs
} from "vue";

export function createPinia() {

    const pinia = {

        install(app) {
            app.provide('pinia', pinia);

        },
        // 单独收集 state ,不和其他actions getters混在一起方便后续使用，例如 $reset重置
        _state: reactive({}),
        _stores: {},
        _plugins: [],
        // 根 scope ,管理全局 scope
        _scope: effectScope()

    }

    return pinia;

}

export function defineStore(storeKey, options) {

    const isSetupStore = typeof options === 'function';

    //setup 外部使用 (ssr)
    return function useStore(pinia = null) {

        if (!pinia) pinia = getCurrentInstance() && inject('pinia');

        if (!pinia) throw  new Error('need pinia');

        let store = pinia._stores[storeKey];

        if (!store) {

            if (isSetupStore) {

                store = createSetupStore(storeKey, options, pinia)

            } else {

                store = createOptionStore(storeKey, options, pinia);
            }

            pinia._stores[storeKey] = store;
            pinia._state[storeKey] = store.$state;

        }

        return store;
    }


}


function createSetupStore(storeKey, setup, pinia) {

    let scope;
    // scope 收集 用于 $dispose等
    const setupResult = pinia._scope.run(() => {

        scope = effectScope();

        return scope.run(() => setup());
    })

    // setupResult 中：
    // reactive ref  = state
    // computed   = getters
    // function  =  actions

    const state = {};
    const actions = {};

    Object.entries(setupResult).forEach(([key, value]) => {

        if (isProxy(value) || isRef(value)) {

            state[key] = value;

        }

        if (typeof value === "function") {

            actions[key] = value;

        }

    })

    const store = Object.assign(reactive({}), state, actions);

    store.$state = state;
    return store;

}


function createOptionStore(storeKey, options, pinia) {

    const {state, actions = {}, getters = {}} = options;


    const setup = function () {


        const stateRefs = toRefs(reactive(state()));

        const gettersWrapper = Object.entries(getters).reduce((memo, [key, value]) => {

            memo[key] = computed(() => {
                const store = pinia._stores[storeKey];
                return value.call(store, store.$state);
            });

            return memo;

        }, {})


        const actionsWrapper = Object.entries(actions).reduce((memo, [key, value]) => {

            memo[key] = function () {

                const store = pinia._stores[storeKey];

                return value.call(store, store.$state);

            }
            return memo;

        }, {})

        return {
            ...stateRefs,
            ...gettersWrapper,
            ...actionsWrapper

        }


    }

    const store = createSetupStore(storeKey, setup, pinia);

    return store;


}