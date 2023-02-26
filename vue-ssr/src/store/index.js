import Vue from 'vue'
import Vuex, {Store} from "vuex";

const baseURL = 'http://localhost:8080';

Vue.use(Vuex);

export default function createStore() {

    const store = new Store({
        state: {
            msg: 'hello world'
        },
        actions: {
            async getMsg({commit}) {

                let {data} = await (await fetch(`${baseURL}/api/msg`)).json();
                commit('setMsg', {payload: data});
            }
        },
        mutations: {

            setMsg(state, payload) {
                state.msg = payload.data;
            }


        }
    })

    if (window && window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__);
    return store;
}