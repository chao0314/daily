// import {createRouter, createWebHistory} from 'vue-router'
import {createRouter, createWebHistory} from '../../../router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ChildOne from '../components/ChildOne.vue';
import ChildTwo from '../components/ChildTwo.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('../views/AboutView.vue')
            component: AboutView,
            children: [
                {path: 'one', component: ChildOne},
                {path: 'two', component: ChildTwo}
            ]
        }
    ]
})

export default router
