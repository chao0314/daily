import {createStore} from '../../vuex-simple';


export default createStore({
    state: {
        count: 0
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        one: {
            namespace: true,
            state: {count: 1},
            modules: {
                three: {
                    namespace: true,
                    state: {count: 3}
                }

            }
        },
        two: {
            namespace: true,
            state: {count: 2}
        }

    }
})
