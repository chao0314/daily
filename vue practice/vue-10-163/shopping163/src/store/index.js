import Vue from 'vue';
import Vuex from "vuex";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import header from "./modules/header";
import index from "./modules/index";

Vue.use(Vuex);
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state,
    mutations,
    actions,
    getters,
    modules: {
        header,
        index
    }
});