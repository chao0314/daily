import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import axios from '@/axios';

export default new Vuex.Store({
  state: {
    catalogs: {}
  },
  mutations: {
    setCatalogs(state, {index, data}){
      Vue.set(state.catalogs, index, data);
    }
  },
  actions: {
    // getCatalog({commit}, index){
    //   commit('setCatalogs', {
    //     index,
    //     data: {a: 12}
    //   });
    // }
    async getCatalog({state, commit}, index){
      if(!state.catalogs[index]){
        let {data}=await axios('/catalog', {
          method: 'get',
          params: {index}
        });

        if(data.err){
          alert(data.msg);
        }else{
          commit('setCatalogs', {
            index,
            data: data.data
          });
        }
      }
    }
  },
  getters: {
    catalogs(state){
      return state.catalogs;
    }
  }
});
