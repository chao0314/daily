import {createStore} from '../../../vuex' // new Store


const store = createStore({

    state: { // 组件中的data
        count: 0
    },
    getters: { // 计算属性 vuex4 他并没有实现计算属性的功能
        double(state) {
            return state.count * 2
        }
    },
    mutations: { // 可以更改状态 必须是同步更改的
        add(state, payload) {
            state.count += payload
        }
    },
    actions: { // 可以调用其他action，或者调用mutation
        asyncAdd({commit}, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('add', payload);
                    resolve()
                }, 1000)
            })
        }
    },
    modules: { // 子模块 实现逻辑的拆分 
        aCount: {
            namespaced: true,
            state: {count: 0},
            mutations: {
                add(state, payload) { // aCount/add
                    state.count += payload
                }
            },
            modules: {
                cCount: {
                    namespaced: true,
                    state: {count: 0},
                    mutations: {
                        add(state, payload) { // aCount/cCount
                            state.count += payload
                        }
                    },
                }
            }
        },
        bCount: {
            state: {count: 0},
            namespaced: true,
            mutations: {
                add(state, payload) { // bCount/add
                    state.count += payload
                }
            },
        }

    }
})


export default store;