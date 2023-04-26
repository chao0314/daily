import {inject, shallowRef} from 'vue';
import {createHistoryNavigation} from "./history";
import RouterLink from "./RouterLink";
import RouterView from "./RouterView";

export function createRouter(options = {}) {

    const {routes, history} = options;

    const initState = {
        from: null,
        current: '/',
        forward: null
    }


    const currentRoute = shallowRef({
        ...initState, matched: []
    });

    const routeRecords = [];

    const router = {
        push,
        replace
    }

    function push(to, state) {

        history.push(to, state);
        resolve(to);

    }

    function replace(to, state) {
        history.replace(to, state);
        resolve(to);
    }

    function resolve(to) {

        const routeRecord = routeRecords.find(record => record.path === to);
        if (!routeRecord) throw new Error('no matched route');
        const state = history.historyState.value;
        let {component, parent} = routeRecord;

        const matched = [];
        matched.push(component);

        while (parent) {

            matched.unshift(parent.component);
            parent = parent.parent;
        }


        currentRoute.value = {...state, matched};

    }

    function addRoute(route, parent) {

        const {name, component, children = []} = route;
        let {path} = route;

        if (parent) path = `${parent.path === '/' ? '' : parent.path}/${path}`;

        const normalizeRoute = {path, name, component, parent, children: []};

        if (parent) parent.children.push(normalizeRoute);

        for (let i = 0; i < children.length; i++) {

            addRoute(children[i], normalizeRoute);

        }

        routeRecords.push(normalizeRoute);

    }

    function addRoutes(routes) {

        for (let i = 0; i < routes.length; i++) {

            const route = routes[i];

            addRoute(route);


        }


    }

    addRoutes(routes);

    console.log(routeRecords);
    return {

        install(app, options) {

            app.provide('app_router', router);
            app.provide('app_route', currentRoute);
            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);
            //初始化 state
            replace('/', initState);


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