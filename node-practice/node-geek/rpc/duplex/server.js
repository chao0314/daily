const net = require('net');
const {serverData: data} = require('./data');
const headerLength = 6;

const server = net.createServer(socket => {
    let unHandleBuffer = null;
    socket.on('data', chunk => {
        if (unHandleBuffer && unHandleBuffer.length > 0) {
            unHandleBuffer = Buffer.concat([unHandleBuffer, chunk]);
        } else {
            unHandleBuffer = chunk;
        }

        let length = checkPackage(unHandleBuffer);
        if (length > 0) {

            let request = decode(unHandleBuffer.slice(0, length))

            unHandleBuffer = unHandleBuffer.slice(length);

            console.log('request', request);

            socket.write(encode({
                seq: request.seq,
                data: data[request.id]
            }))

        }

    })

})

server.listen(8090, () => {

    console.log('tcp server,port:8090');
})

function checkPackage(data) {

    if (headerLength > data.length) return -1;
    if (headerLength === data.length) return 0;
    else {
        let header = data.slice(0, headerLength);
        let bodyLength = header.readInt32BE(2);
        return headerLength + bodyLength;
    }

}

function decode(data) {

    let header = data.slice(0, headerLength);
    let body = data.slice(headerLength);
    let seq = header.readInt16BE(0);
    let id = body.readInt32BE(0);
    return {seq, id}

}

function encode({seq, data}) {
    let header = Buffer.alloc(6);
    let body = Buffer.from(data);
    header.writeInt16BE(seq, 0);
    header.writeInt32BE(body.length, 2);
    return Buffer.concat([header, body]);
}