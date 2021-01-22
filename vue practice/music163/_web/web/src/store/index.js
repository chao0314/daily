import Vuex from "vuex";
import Vue from "vue";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
export default new Vuex.Store({
    strict: process.env.NODE_ENV === "development",
    state,
    mutations,
    actions,
    getters
});

