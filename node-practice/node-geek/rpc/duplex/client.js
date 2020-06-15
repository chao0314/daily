const net = require('net');
const {clientData: data} = require('./data');
let unHandleBuffer = null;
let seq = -1;
const client = net.createConnection({
    host: '127.0.0.1', port: 8090
}, () => {
    console.log('client tcp connect')
})

client.on('data', chunk => {

    if (unHandleBuffer && unHandleBuffer.length > 0) {
        unHandleBuffer = Buffer.concat(unHandleBuffer, chunk);
    } else {
        unHandleBuffer = chunk;
    }
})

