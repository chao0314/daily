import {createRouter, createWebHashHistory} from 'vue-router'
import MobileView from '../views/MobileView.vue'
import ReportView from "@/views/ReportView";
import PCView from "@/views/PCView";

const routes = [
    {
        path: '/',
        name: 'pc',
        component: PCView
    },
    {
        path: '/report',
        name: 'report',
        component: ReportView
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }, {

        path: '/mobile',
        name: 'mobile',
        component: MobileView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
