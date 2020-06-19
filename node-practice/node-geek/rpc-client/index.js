const net = require('net');
const Rpc = require('../rpc/rpc');
const EventEmitter = require('events');

class Client extends EventEmitter{

    constructor(options) {

        super();
        this.rpc = new Rpc(options.handler);
        this.connection = this.createConnection(options);
        // this.interceptors = [];
        this.pool = {};
        this.seq = -1;

    }

    createConnection(options) {
        return net.createConnection(options, () => {

            this.rpc.handle(this.connection, (error, response) => {

                console.log('client response', error, response);

                if(error)


            })

        }


        send(data)
        {
            return new Promise((resolve, reject) => {
                this.rpc.send(this, this.connection, data);
                this.pool[++this.seq] = (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            });


        }


        // use(middleware) {
        //     this.interceptor.push(middleware);
        // }

        // async handle(request, ctx) {
        //     for (let i = 0; i < this.interceptors.length; i++) {
        //         let interceptor = this.interceptors[i];
        //         await interceptor(request, ctx);
        //     }
        //
        // }

    }

    exports = module.exports = Server;



