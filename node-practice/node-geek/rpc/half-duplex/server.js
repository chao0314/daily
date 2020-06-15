const net = require('net');
const {serverData: data} = require('./data');

const server = net.createServer((socket => {

    let temp = [];
    socket.on('data', chunk => {

        temp.push(chunk);

        setTimeout(() => {

            let content = Buffer.concat(temp);
            let header = content.slice(0, 2);
            let body = content.slice(2);
            let id = body.readInt32BE(0);
            console.log('index', header.readInt16BE());
            console.log('id', id);
            let response = data[id];
            console.log(response);
            socket.write(Buffer.concat([header, Buffer.from(response)]));
        }, 100)

    })

    socket.on('end', chunk => {

        console.log('tcp end');
    })

    socket.on('error', e => {

        console.log('tcp error---', e)
    })

    socket.on('close', () => {
        console.log('tcp close');
    })


}));

server.listen(8090, () => {
    console.log('tcp server , port : 8090');
})


