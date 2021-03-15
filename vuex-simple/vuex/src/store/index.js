import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from "../m-vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    state: {
        msg: "hello world"
    },
    mutations: {
        setMsg(state, payload) {

            state.msg = payload

        }
    },
    actions: {

        setMsg({commit}, payload) {

            console.log('this is actions');

            commit('setMsg', payload);

        }
    },
    modules: {

        a: {
            namespaced: true,
            state: {
                msg: 'this from module a'

            },
            mutations: {
                setMsg(state, payload) {

                    state.msg = payload

                }
            },
            actions: {

                setMsg({commit}, payload) {

                    commit('setMsg', payload);

                }
            }


        }
    }
})
