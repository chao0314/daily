const diLoader = require('./di/diLoader');
const KoaRouter = require('koa-router');
const path = require('path');

class InstallRouter {
    constructor() {
        this.routeCollection = diLoader.getDependence('router');
        this.methods = ['get', 'post', 'patch', 'delete', 'options', 'head'];
    }

    install(app) {
        let container = {};
        let rootRouter = new KoaRouter({prefix: '/'});
        Object.entries(this.routeCollection).forEach(([route, routerPath]) => {
            // console.log(route,route.split(path.sep))
            let fragments = route.split(path.sep).filter(route => route).slice(0, -1);
            let handler = require(routerPath);
            handler = handler.hasOwnProperty('prototype') ? new handler() : handler;
            // console.log(fragments);
            let handlerRoute = fragments.pop();
            // console.log(fragments);
            if (fragments.length === 0) {
                this._mount(rootRouter, handlerRoute, handler);
            } else {
                let queue = [];
                for (let i = 0; i < fragments.length; i++) {
                    let parentPath = fragments.slice(0, i + 1).join('/');
                    let parentRouter = container[parentPath];
                    if (!parentRouter) parentRouter = container[parentPath] = new KoaRouter({prefix: '/'});

                    queue.push({route: fragments[i], router: parentRouter});

                }

                if (queue.length === 1) {
                    let {route, router} = queue.pop();
                    this._mount(router, handlerRoute, handler);
                    rootRouter.use(route, router.routes());

                } else {
                    for (let j = queue.length - 1; j > 0; j--) {
                        let {route: curRoute, router: curRouter} = queue[j];
                        let {route: parentRoute, router: parentRouter} = queue[j - 1];
                        if (j === queue.length - 1) this._mount(curRouter, handlerRoute, handler);
                        parentRouter.use(curRoute, curRouter.routes());
                        if (j === 1) rootRouter.use(parentRoute, parentRouter.routes());

                    }
                }


            }


        })
        diLoader.removeDependence('router');
        app.use(rootRouter.routes());
        return rootRouter;

    }

    _mount(router, handlerRoute, handler) {

        this.methods.forEach(method => {

            if (typeof handler[method] === 'function') {

                router[method](handlerRoute, handler[method].bind(handler));
            }

        })

    }


}

exports = module.exports = InstallRouter;