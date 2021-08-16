import {createRouter, createWebHistory} from '../../vue-router'
import Home from '../views/Home.vue'
import About from "../views/About";
import One from "@/components/One";
import Two from "@/components/Two";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {path: 'one', component: One},
            {path: 'two', component: Two}
        ],
        beforeEnter(to, from, next) {
            console.log('before enter', to)
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]
const router = createRouter({ // mode
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('beforeEach1', to);
            resolve();
        }, 1000);
    })
});
router.beforeEach((to, from, next) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('beforeEach2', to);
            resolve();
        }, 1000);
    })
});
router.beforeEach((to, from, next) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('beforeEach3', to);
            resolve();
        }, 1000);
    })
});
router.beforeResolve((to, from, next) => {
    console.log('beforeResolve', to);
})
router.afterEach((to, from, next) => {
    console.log('afterEach', to);
})


export default router
