const Layer = require('./layer');

class Router {

    constructor(options = {}) {
        this.layers = [];
        this.children = [];
        this.prefix = options.prefix || '';

    }

    get(path, handler) {
        this.layers.push(new Layer(path, 'get', handler));
    }

    post(path, handler) {
        this.layers.push(new Layer(path, 'post', handler));
    }

    use(path, middleware) {

        if (middleware.router instanceof Router) {
            middleware.router.setPrefix(path);
            this.children.push(middleware);
        } else {
            this.get(path, middleware);
            this.post(path, middleware);
        }

    }

    routes() {

        const dispatch = async (ctx, next) => {

            let {url, method} = ctx;
            console.log("router---",url, method);
            let route = null;

            for (let i = 0; i < this.layers.length; i++) {

                let cur = this.layers[i];

                if (this.prefix) cur.setPrefix(this.prefix);

                if (cur.match(url, method)) {
                    route = cur;
                    break;
                }
            }

            if (route) {
                return route.stack.forEach(handler => handler(ctx, next));
            }

            if (this.children.length > 0) {

                for (let j = 0; j < this.children.length; j++) {
                    let child = this.children[j];
                    if (url.startsWith(child.router.prefix)) {
                        return await child(ctx, next);
                    }
                }

            }

            console.log('go next middleware');
            //该路由中间件包括嵌套路由中间件都没有匹配到 进入下一个中间件
            await next();

        };

        dispatch.router = this;
        return dispatch;


    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }
}


exports = module.exports = Router;