const net = require('net');
const Rpc = require('./rpc');

class Server {

    constructor(options) {
        this.rpc = new Rpc(options.handler);
        this.server = this.createServer(options);
        this.middlewares = [];

    }

    createServer(options) {
        return net.createServer(options, socket => {

            this.rpc.handle(socket, (request) => {

                console.log('rpc request', request);

                this.handleReq(request, {send: this.rpc.send.bind(socket)}).catch(e => {
                    console.log(e);
                    socket.write('500');
                });

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



