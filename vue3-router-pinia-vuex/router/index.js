import {inject} from 'vue';
import {createHistoryNavigation} from "./history";


export function createRouter(options = {}) {

    const {routes, history} = options;

    const initState = {
        from: null,
        current: '/',
        forward: null,
        matched: []
    }

    const {push, replace} = history;

    const router = {

        push, replace

    }

    const route = {};

    return {

        install(app, options) {

            app.provide('app_router', router);

            replace(state,)
        }

    }

}

export function createWebHistory() {

    return createHistoryNavigation();

}

export function createHashHistory() {

    return createHistoryNavigation('#');

}

export function useRouter() {

    return inject('app_router');


}