const EventEmitter = require('events');
const http = require('http');
const Stream = require('stream');
const Context = require('./context');


class Application extends EventEmitter {
    constructor() {
        super();
        this.middlewares = [];
        this.context = null;
    }

    use(middleware) {

        this.middlewares.push(middleware);

    }

    handler(req, res) {
        //temporary
        if (req.url.includes('/favicon.ico'))  return res.end('');
        console.log('handler---------', req.url);


        this.context = new Context(req, res);
        this.compose(this.middlewares, this.context).then(() => {
            console.log('all middleware finish');
            let result = this.context.body;
            if (result instanceof Stream) result.pipe(res);
            else if (typeof result === 'string' || Buffer.isBuffer(result)) res.end(result);
            else if (typeof result === 'number') res.end(String(result));
            else if (typeof result === 'object') res.end(JSON.stringify(result));
            else {
                res.statusCode = 404;
                res.end('Not Found');
            }

        }).catch(e => {

                this.emit('error', e);

            }
        )

    }

    compose(middlewares, context) {

        let flag = -1;
        const dispatch = i => {

            let middleware = middlewares[i];

            if (i <= flag) return Promise.reject('next() called many times');
            flag++;

            if (middleware instanceof Function) {

                try {
                    return Promise.resolve(middleware(context, () => dispatch(++i)));
                } catch (e) {
                    return Promise.reject(e);
                }

            } else return Promise.resolve();


        };

        return dispatch(0);
    }


    listen(port) {
        let server = http.createServer((req, res) => this.handler(req, res));
        server.listen(port, () => console.log(`server port is ${port}`));
        return server;
    }
}


exports = module.exports = Application;