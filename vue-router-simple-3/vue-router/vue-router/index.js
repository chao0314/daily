import createHistory from "./history/h5";
import createHashHistory from "./history/hash";
import createRouterMatcher from "./matcher";
import {computed, shallowRef, reactive, inject} from "vue";
import RouterLink from "./component/RouterLink";
import RouterView from "./component/RouterView";

export const createWebHistory = createHistory;
export const createWebHashHistory = createHashHistory;


const INIT_LOCATION = {
    path: "",
    matched: []
}

export function createRouter(options) {

    const {history, routes} = options;
    const routerMatcher = createRouterMatcher(routes);
    // 初始化 理由  如果 reactive 直接用，那么每次赋值都需要 处理
    const currentRoute = shallowRef(INIT_LOCATION);

    function push(location) {

        const to = resolve(location);
        const from = currentRoute.value;
        // todo..........
        finalizeNavigation(to, from);

    }


    function finalizeNavigation(to, from, replaced = false) {

        // 初始化跳转 是为了获得 currentRoute对应的根目录的实际值 不是 INIT_LOCATION
        if (from === INIT_LOCATION || replaced) {
            history.replace(to.path);
        } else {

            history.push(to.path);
        }

        currentRoute.value = to;

        //初始化 需要添加绑定事件，监听 前进 后退 按钮
        if (from === INIT_LOCATION) {

            history.listen(to => {

                const target = resolve(to);
                const from = currentRoute.value;
                // 在切换前进后退 是 替换模式不是push模式
                finalizeNavigation(target, from, true);

            })

        }


    }


    function resolve(location) { // to="/"   to={path:'/'}
        if (typeof location === 'string') {
            return routerMatcher.resolve({path: location})
        }
    }


    const router = {
        install(app) { // 路由的核心就是 页面切换 ，重新渲染

            const route = {};
            //currentRoute 经常变，computed 响应式，可以在组件内相应变化
            Object.keys(INIT_LOCATION).forEach(key => {
                route[key] = computed(() => currentRoute[key]);
            })

            // 借助 reactive自动解包 ref，route.xxx 即可 就不通用 route.xxx.value 使用了
            const reactiveRoute = reactive(route);

            app.config.globalProperties.$router = router;
            app.config.globalProperties.$route = reactiveRoute;

            // Object.defineProperty(app.config.globalProperties, '$route', {
            //     enumerable: true,
            //     get: () => reactiveRoute
            // })

            app.provide("router", router);
            app.provide("route", reactiveRoute);

            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);

            if (currentRoute.value === INIT_LOCATION) {
                // 默认就是初始化, 需要通过路由系统先进行一次跳转 发生匹配
                push(history.location)
            }


        },
        push


    }

    return router;

}


export function useRouter() {

    return inject("router", {});

}





