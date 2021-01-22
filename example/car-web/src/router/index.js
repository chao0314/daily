import Vue from 'vue'
import VueRouter from 'vue-router'

const Admin = () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue');
const AdminLogin = () => import(/* webpackChunkName: "admin" */ '@/components/admin/Login');
const AdminIndex = () => import(/* webpackChunkName: "admin" */ '@/components/admin/Index');

const Web = () => import(/* webpackChunkName: "web" */ '../views/Web.vue');
const WebIndex = () => import(/* webpackChunkName: "web" */ '@/components/web/index/Index');
const WebCar = () => import(/* webpackChunkName: "web" */ '@/components/web/car/Index');
const WebContract = () => import(/* webpackChunkName: "web" */ '@/components/web/contract/Index');


Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        component: Admin,
        children: [
            {

                path: '',
                component: AdminIndex
            },
            {
                path: 'login',
                component: AdminLogin
            }
        ]
    },
    {
        path: "/",
        component: Web,
        children: [

            {
                path: "",
                component: WebIndex
            },
            {
                path: 'car',
                component: WebCar
            }, {
                path: 'contract',
                component:WebContract
            }
        ]
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return {x: 0, y: 0};
    }
})


router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !localStorage.getItem('token')) next({path: '/admin/login'});
    else next();

})
export default router
