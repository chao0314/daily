import Vue from 'vue';
import Router from 'vue-router';
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Search from "@/views/Search.vue";
import Detail from "@/views/Detail.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }, {
            path: "/register",
            name: "Register",
            component: Register
        }, {
            path: '/search',
            name: "search",
            component: Search
        }, {
            path: '/detail',
            name: 'detail',
            component: Detail
        }
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        // },
    ],
});
