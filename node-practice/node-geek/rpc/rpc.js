class Rpc {
    constructor(handler) {
        this.handler = handler
    }

    handle(socket, callback) {
        let unHandleBuffer = null;
        socket.on('data', chunk => {
            if (unHandleBuffer && unHandleBuffer.length > 0) {
                unHandleBuffer = Buffer.concat([unHandleBuffer, chunk]);
            } else {
                unHandleBuffer = chunk;
            }

            let packageLength = -1;
            while ((packageLength = this.handler.checkReceiveComplete(unHandleBuffer)) > 0) {
                try {
                    let request = this.handler.decode(unHandleBuffer.slice(0, packageLength));
                    unHandleBuffer = unHandleBuffer.slice(packageLength);
                    callback instanceof Function && callback(null, request);
                } catch (e) {
                    callback instanceof Function && callback(e);
                }

            }

        })
    }

    send(socket, request, data) {
        if (data.seq === void 0) data.seq = request.seq;
        let response = this.handler.encode(data);
        socket.write(response);

    }


}

exports = module.exports = Rpc;