const Koa = require('koa');
const assert = require('assert');
const http = require('http');
const DI = require('./di/di');

exports = module.exports = class Application {

    constructor(options) {
        this.instance = new Koa(options);
        this.beforeQueue = [];
        this.middleware = [];
        this.afterQueue = [];
        this.errorQueue = [];
        this.port = 8080;
        this.listenCallback = null;

    }


    listen(port, callback) {

        if (typeof port === 'function') {
            this.listenCallback = port;

        } else {
            this.port = port;
            this.listenCallback = callback;
        }


    }

    start() {
        this.instance.use(async (ctx, next) => {
            try {
                await next()
            } catch (e) {
                let length = this.errorQueue.length;
                if (length > 0) {
                    for (let i = 0; i < length; i++) {
                        await this.errorQueue[i](e, ctx);
                    }

                } else throw e;

            }


        })

        this.beforeQueue.forEach(item => this.instance.use(item));
        this.middleware.forEach(item => this.instance.use(item));
        this.afterQueue.forEach(item => this.instance.use(item));

        let server = http.createServer(this.instance.callback());
        server.listen(this.port, () => {
            console.log(`server port: ${this.port}`);
            this.listenCallback instanceof Function && this.listenCallback();
        });


    }

    use(middleware) {
        assert(middleware instanceof Function, 'parameter of use must be function');
        this.middleware.push(middleware);
    }

    before(middleware) {
        assert(middleware instanceof Function, 'parameter of before must be function');
        this.beforeQueue.push(middleware);

    }

    after(middleware) {
        assert(middleware instanceof Function, 'parameter of after must be function');
        this.afterQueue.push(middleware);
    }

    error(middleware) {
        assert(middleware instanceof Function, 'parameter of error must be function');

        this.errorQueue.push(middleware);

    }

    store(name, instance) {

        DI.mount('store', name, instance);
    }

    extend(name, instance) {
        DI.mount('extend', name, instance);

    }
}




