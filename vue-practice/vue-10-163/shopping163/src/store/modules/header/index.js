import http from "@/http";

const state = {
    catalogs:new Map()
};
const mutations = {
    setCatalogs(state, {index, data}) {
        state.catalogs.set(index,data);
    }
};
const actions = {
    async getAutoComplete({commit}, keyword) {
        try {
            let {data: {err, msg, data}} = await http('/searchautocomplete', {
                method: 'GET',
                params: {kw: keyword}
            });
            if (err) throw new Error(msg);
            return data;
        } catch (e) {
            throw e;
        }


    },
    async getCatalog({state,commit},index){
        if(state.catalogs.has(index)) return state.catalogs.get(index);
        try {
            let {data:{err,msg,data}}=await http('/catalog', {
                method: 'GET',
                params: {
                   index
                }
            });
            if (err) throw new Error(msg);
            commit("setCatalogs",{index,data});
            return data;
        }catch (e) {
            throw e;
        }
    }
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}