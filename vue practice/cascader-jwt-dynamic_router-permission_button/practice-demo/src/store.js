import Vue from 'vue'
import Vuex from 'vuex'
import data from '../static/data';
import Axios from 'axios';

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
axios.interceptors.request.use(function (config) {
    config.headers.authorization = localStorage.getItem('token');
    return config;
});

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        hasDynamicRoute: -1,
        dynamicRoute: {}
    },
    mutations: {
        setDynamicRouteCode(state, code) {
            state.hasDynamicRoute = code;
        },
        setDynamicRoutes(state, routes) {
            state.dynamicRoute = routes;
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
                    root[route.path] = [route];
                } else map[pid].children.push(route);
                paths.push(route.path);
            });
            commit('setDynamicRoutes', root);
            return paths;
        },
        async login({commit}, payload) {
            let {name, password} = payload;
            let {token} = await axios.post("login", {name, password});
            console.log("client token", token);
            localStorage.setItem("token", token);
        },
        async verify({state,commit}, payload) {
            state.before = localStorage.getItem('token');
            let {token} = await axios.post("verify");
            console.log("verify", token);
            localStorage.setItem('token', token);
        },
        async before({state}){
            localStorage.setItem('token',state.before);
            let {token} = await axios.post("verify");
        }
    }
})
