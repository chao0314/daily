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
})



export default router
