const fs = require('fs');
const http = require('http');
const path = require('path');

const testPath = path.resolve(__dirname, './test.txt');
const totalSize = fs.statSync(testPath).size;

let server = http.createServer((req, res) => {

    let range = req.headers['range'];
    console.log('range', range);

    if (range) {
        let [, start = 0, end = totalSize] = range.match(/(\d+)\s*-\s*(\d+)/);
        start = Number(start);
        end = Number(end);
        if (start >= totalSize) return res.end();
        if (end >= totalSize) end = totalSize-1;
        res.statusCode = 206;
        res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', end - start + 1);
        fs.createReadStream(testPath, {
            start,
            end
        }).pipe(res);
    } else {
        fs.createReadStream(testPath).pipe(res);
    }


})

server.listen('8090', () => console.log('server port is 8090'));