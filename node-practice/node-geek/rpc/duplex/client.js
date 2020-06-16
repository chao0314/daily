const net = require('net');
const {clientData: data} = require('./data');
const headerLength = 6;
let unHandleBuffer = null;
let seq = -1;
const client = net.createConnection({
    host: '127.0.0.1', port: 8090
}, () => {
    console.log('client tcp connect')

    for (let i = 0; i < 100; i++) {
        let id = data[Math.floor(Math.random() * data.length)];
        let req = encode({seq: ++seq, id});
        // console.log(req);
        client.write(req);

    }
})

client.on('data', chunk => {
    console.log('data', chunk);
    if (unHandleBuffer && unHandleBuffer.length > 0) {
        unHandleBuffer = Buffer.concat([unHandleBuffer, chunk]);
    } else {
        unHandleBuffer = chunk;
    }

    let length = -1;
    while ((length = checkPackage(unHandleBuffer)) > 0) {

        let response = decode(unHandleBuffer.slice(0, length));

        unHandleBuffer = unHandleBuffer.slice(length);

        console.log(response.seq, response.res);
    }


})


function checkPackage(data) {
    if (headerLength === data.length) return 0;
    if (headerLength < data.length) {
        let header = data.slice(0, headerLength);
        let bodyLength = header.readInt32BE(2);
        let totalLength = headerLength + bodyLength;
        if (totalLength <= data.length) return totalLength;
    }
    return -1;

}


function decode(data) {
    let header = data.slice(0, headerLength);
    let body = data.slice(headerLength);
    let seq = header.readInt16BE(0);
    let res = body.toString();
    return {seq, res}

}

function encode({seq, id}) {
    let header = Buffer.alloc(headerLength);
    let body = Buffer.alloc(4);
    header.writeInt16BE(seq, 0);
    header.writeInt32BE(body.length, 2);
    body.writeInt32BE(id, 0);
    return Buffer.concat([header, body]);
}
