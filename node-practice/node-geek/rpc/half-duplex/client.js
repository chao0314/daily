const net = require('net');
const {clientData: data} = require('./data');
let index = 0;
const client = net.createConnection({host: '127.0.0.1', port: 8090}, () => {

    console.log('client tcp connect');
    let request = Buffer.alloc(6);
    let id = data[Math.floor(Math.random() * data.length)];
    request.writeInt16BE(index++, 0);
    request.writeInt32BE(id, 2);
    client.write(request);


})

let temp = []
client.on('data', chunk => {
    console.log('client tcp data');
    temp.push(chunk);
    setTimeout(() => {
        let response = Buffer.concat(temp);
        let header = response.slice(0, 2);
        let body = response.slice(2);
        let index = header.readInt16BE(0);
        let content = body.toString();
        console.log(index, content);
    }, 100)
})
client.on('end', () => {

    console.log('client tcp end');
})

client.on('error', e => {
    console.log('error', e)
})
client.on('close', () => {
    console.log('client tcp close');
})


setTimeout(() => {

    client.destroy(new Error('close socket !'))
}, 10 * 1000);
