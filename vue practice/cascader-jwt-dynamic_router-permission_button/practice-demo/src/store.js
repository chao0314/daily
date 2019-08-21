import Vue from 'vue'
import Vuex from 'vuex'
import data from '../static/data';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        async getDataById({commit}, id) {

            return data.filter(value => Number(value.pid) === Number(id));
        }

    }
})
