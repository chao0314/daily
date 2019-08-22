import Vue from 'vue'
import Router from 'vue-router'
import Store from "./store";
import Home from './views/Home.vue';

const Cart = () => import(/* webpackChunkName: "cart" */ '@/components/cart/Cart.vue');
const CartList = () => import(/* webpackChunkName: "cart" */ '@/components/cart/CartList.vue');
const CartLottery = () => import(/* webpackChunkName: "cart" */ '@/components/cart/CartLottery.vue');
const CartProduct = () => import(/* webpackChunkName: "cart" */ '@/components/cart/CartProduct.vue');
const NotFound = {
    path: '*',
    component: {
        render(h) {
            return h('h1', {}, "Not Found");
        }
    }
};

Vue.use(Router);
const BLACKLIST = ['/cart', '/cart/list', '/cart/list/lottery', '/cart/list/product'];
const dynamicRoutes = [
    {
        path: '/cart',
        name: "cart",
        meta: "needLogin",
        component: Cart,
        children: [
            {
                path: 'list',
                name: 'list',
                component: CartList,
                children: [
                    {
                        path: 'lottery',
                        name: 'lottery',
                        component: CartLottery
                    },
                    {
                        path: 'product',
                        name: 'product',
                        component: CartProduct
                    }
                ]
            }
        ]


    },

];
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
});
router.beforeEach((to, form, next) => {
    let hasDynamicRoute = Store.state.hasDynamicRoute;
    if (hasDynamicRoute === 1) next();
    else if (isDynamicRoute(BLACKLIST, to.matched)) {
        if (hasDynamicRoute === 0) next(Object.assign({}, to, {replace: true}));
        else {
            getDynamicRoute(() => next(Object.assign({}, to, {replace: true})));
        }
    } else {
        next();
        if (hasDynamicRoute === -1) getDynamicRoute();
    }
});

function isDynamicRoute(bl, routes) {
    routes = routes.map(route => route.path);
    console.log(routes);
    let temp = bl.concat(routes);
    let set = new Set(temp);
    console.log(temp.length !== set.size);
    return temp.length !== set.size;
}

function handleDynamicRoute(paths) {
    let temp = confirmDynamicRoutes(paths, dynamicRoutes);
    console.log(temp);
    router.addRoutes([...temp, NotFound]);
}


function confirmDynamicRoutes(paths, routes) {

    return routes.filter(route => {
        if (paths.includes(route.path)) {
            if (route.children) confirmDynamicRoutes(paths, route.children);
            return true;
        }
    })


}

function getDynamicRoute(cb) {
    Store.dispatch("getDynamicRoute").then(paths => {
        Store.commit("setDynamicRouteCode", 1);
        handleDynamicRoute(paths);
        cb instanceof Function && cb();
    }).catch(() => {
        Store.commit("setDynamicRouteCode", -1);
    });
    Store.commit("setDynamicRouteCode", 0);
}

export default router;

