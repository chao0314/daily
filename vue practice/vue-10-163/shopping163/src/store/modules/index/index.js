import http from "@/http";

const state = {
    banners: [],
    sidebar: []
};
const actions = {
    async getBanners({state, commit}) {
        if (state.banners.length > 1) return state.banners;
        try {
            let {data: {err, msg, data}} = await http('/banners');
            if (err) throw new Error(msg);
            commit("setBanners", data);
            return data;
        } catch (e) {
            throw e;
        }
    },
    async getSidebar({state, commit}) {
        if ((state.sidebar.length > 1)) return state.sidebar;
        try {
            let {data: {err, msfg, data}} = await http('/sidebar');
            if (err) throw new Error(msg);
            commit("setSidebar", data);
            return data;
        } catch (e) {
            throw e;
        }
    },
    async searchByKeyword({commit}, {keyword, page}) {
        try {
            let {data: {err, msg, data}} = await http('/search', {
                method: 'GET',
                params: {
                    keyword,
                    page
                }
            });
            if(err) throw new Error(msg);
            return data;
        } catch (e) {
            throw e;
        }
    }
};
const mutations = {
    setBanners(state, paylod) {
        state.banners = paylod;
    },
    setSidebar(state, payload) {
        state.sidebar = payload;
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}