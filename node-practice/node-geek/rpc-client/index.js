const net = require('net');
const Rpc = require('../rpc/rpc');
const EventEmitter = require('events');

class Client extends EventEmitter {

    constructor(options) {

        super();
        this.timeout = options.timeout || 10000;
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
                        let {seq, body,body: {error}} = response;
                        let value = this.queue[seq];
                        //timeout , have been clear
                        if (value === void 0) return;
                        if (error) value.callback(error);
                        else value.callback(null, body);
                        delete this.queue[seq];
                    }


                }
            )
        })


    }

    send(data) {
        data.seq = ++this.seq;
        return new Promise((resolve, reject) => {
            this.rpc.send(this.connection, {}, data);
            this.setTimeout();
            this.queue[this.seq] = {
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
                delete this.queue[seq];
                callback(new Error('request timeout'));

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



