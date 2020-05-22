const Layer = require('./layer');

class Router {

    constructor() {
        this.layers = [];
        this.children = [];
    }

    get(path, handler) {
        this.layers.push(new Layer(path, 'get', handler));
    }

    post(path, handler) {
        this.layers.push(new Layer(path, 'post', handler));
    }

    use(path, middleware) {


    }

    routes() {

        return (ctx, next) => {

            let {url, method} = ctx;
            console.log(url, method);
            let route = null;

            for (let i = 0; i < this.layers.length; i++) {

                let cur = this.layers[i];

                if (cur.match(url, method)) {
                    route = cur;
                    break;
                }
            }

            if (route) {
                return route.stack.forEach(handler => handler(ctx, next));
            }

            if(this.children.length >0){


            }


        }


    }
}


exports = module.exports = Router;