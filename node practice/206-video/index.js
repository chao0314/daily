const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const url = require('url');
const path = require('path');
const SIZE = 1024 * 1024;
const cache = new Map();//redis
const server = http.createServer(async (req, res) => {

    let {pathname} = url.parse(req.url, true);
    //console.log('pathname', pathname);
    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html,charset=utf8')
        fs.createReadStream(path.resolve(__dirname, './video.html')).pipe(res);
    } else if (pathname.endsWith('show.mp4')) {
        let range = req.headers['range'];
        console.log('range', range);
        let [, start, end] = range.match(/(\d+)\s*-\s*(\d*)/);
        start = Number(start || 0);
        end = Number(end || start + SIZE - 1);
        let stats = cache.get(pathname);
        if (!stats) {
            stats = await fsp.stat(path.join(__dirname, pathname));
            cache.set(pathname, stats);
        }
        let size = stats.size;
        if (start >= size) {
            res.statusCode = 200;
            res.end();
            return;
        }
        if (end >= size) {
            end = size - 1;
            res.statusCode = 206;
        } else {

            res.statusCode = 206;
        }


        res.setHeader('Content-Type', 'video/mpeg4');
        res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', end - start + 1);
        console.log(start, end);
        fs.createReadStream(path.join(__dirname, pathname), {
            start,
            end
        }).pipe(res);


        // fs.createReadStream(path.join(__dirname, pathname)).pipe(res);


    } else res.end('not found');


})
server.listen(8090, () => console.log('server port is 8090'))
