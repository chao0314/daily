import Vue from 'vue'
import Vuex from 'vuex'
import data from '../static/data';
import Axios from 'axios';
import response from "../../../../js advanced/10 lesson 数据交互封装 1/src/response";

const axios = Axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': "application/json;charset=utf-8"
    }
});
axios.interceptors.response.use(response => {
    return response.data;

}, error => {
    return Promise.reject(error);
});

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        hasDynamicRoute: -1,
        dynamicRoute: []
    },
    mutations: {
        setDynamicRouteCode(state, code) {
            state.hasDynamicRoute = code;
        },
        setDynamicRoutes(state, route) {
            state.dynamicRoute = route;
        }
    },
    actions: {
        async getDataById({commit}, id) {
            return data.filter(value => Number(value.pid) === Number(id));
        },
        async getDynamicRoute({commit}) {
            let {routes} = await axios.get("roles-route");
            let root = {}, paths = [], map = {};
            routes.forEach(route => {
                let {pid, id} = route;
                route.children = [];
                map[id] = route;
                if (pid < 0) {
                    if (route.path.indexOf("/") !== 0) route.path = `/${route.path}`;
                    root[route.name] = route;
                } else map[pid].children.push(route);
                paths.push(route.path);
            });
            commit('setDynamicRoutes', root);
            return paths;
        }

    }
})
