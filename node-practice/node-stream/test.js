const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream');
const path = require('path');

let rs = new ReadStream(path.resolve(__dirname, './1.txt'));

let ws = new WriteStream(path.resolve(__dirname, './2.txt'));

ws.on('drain', () => {
    console.log('drain');
});
ws.on('close', () => {
    console.log(' ws close')
});
ws.on('error', (err) => {
    console.log(err)
});

// let data = [];
// rs.on('data', chunk => {
//     // console.log('data', chunk);
//     data.push(chunk);
//     // let flag = ws.write(chunk);
//     //console.log(flag)
// });

rs.on('end', () => {
    // console.log('rs end', Buffer.concat(data).toString('utf8'));
    console.log('rs end');
});
rs.on('error', (err) => console.log(err));

console.log('-----------------------------');

rs.pipe(ws);




