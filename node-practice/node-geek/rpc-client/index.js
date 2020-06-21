const net = require('net');
const Rpc = require('../rpc/rpc');
const EventEmitter = require('events');

class Client extends EventEmitter {

    constructor(options) {

        super();
        this.timeout = options.timeout || 5000;
        this.rpc = new Rpc(options.handler);
        this.connection = this.createConnection(options);
        // this.interceptors = [];
        this.queue = {};
        this.seq = -1;
        this.timer = null;

    }

    createConnection(options) {
        return net.createConnection(options, () => {

            this.rpc.handle(this.connection, (error, response) => {

                    console.log('server response', error, response);
                    // if  exist error, do nothing, waiting  handle timeout
                    if (!error) {
                        let {seq, body: {error}} = response;
                        let {callback} = this.queue[seq];
                        //timeout , have been clear
                        if (info === void 0) return;
                        if (error) callback(error);
                        else callback(null, body);
                    }


                }
            )
        })


    }

    send(data) {
        return new Promise((resolve, reject) => {
            this.rpc.send(this, this.connection, data);
            this.setTimeout();
            this.pool[++this.seq] = {
                startTime: Date.now(),
                callback: (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            }
        });


    }


    setTimeout() {
        if (this.timer === null) {
            this.timer = setTimeout(this.clearQueue.bind(this), this.timeout);
        }

    }

    clearQueue() {

        let now = Date.now();
        Object.entries(this.queue).forEach(([seq, {startTime, callback}]) => {
            if (now - startTime >= this.timeout) {
                callback(new Error('request timeout'));
                delete this.queue[seq];
            }
        });
        this.timer = null;
        this.setTimeout();

    }

    // use(middleware) {
    //     this.interceptor.push(middleware);
    // }

    //     for (let i = 0; i < this.interceptors.length
    // async handle(request, ctx) {; i++) {
    //         let interceptor = this.interceptors[i];
    //         await interceptor(request, ctx);
    //     }
    //
    // }

}

exports = module.exports = Client;



