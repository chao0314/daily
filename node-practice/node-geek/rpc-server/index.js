const net = require('net');
const Rpc = require('../rpc/rpc');
const EventEmitter = require('events');


class Server extends EventEmitter {

    constructor(options) {
        super();
        this.rpc = new Rpc(options.handler);
        this.server = this.createServer(options);
        this.middlewares = [];

    }

    createServer(options) {
        return net.createServer(options, socket => {

            this.rpc.handle(socket, (error, request) => {

                console.log('rpc request', error, request);

                if (error) this.emit('error', error);

                else {
                    this.handleReq(request, {send: this.rpc.send.bind(socket, request)}).catch(e => {
                        console.log(e);
                        socket.write('500');
                    });

                }


            })
        })

    }

    listen(port, callback) {

        this.server.listen(port, callback);

    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    async handleReq(request, ctx) {
        for (let i = 0; i < this.middlewares.length; i++) {
            let middleware = this.middlewares[i];
            await middleware(request, ctx);
        }

    }

}

exports = module.exports = Server;



