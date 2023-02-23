const fs = require('fs');
const fsp = fs.promises;
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const mime = require('mime');
const path = require('path');
const util = require('utils');
const zlib = require('zlib');
const tpl = fs.readFileSync(path.resolve(__dirname, '../tpl/tpl.html'), {encoding: 'utf8'});

class Server {

    constructor(config = {}) {
        let {port, cwd} = config;
        this.port = port;
        this.cwd = cwd;
        this.service = http.createServer(this.handler.bind(this));
        this.service.listen(this.port, () => console.log(`server port is ${this.port}`));
        process.on('uncaughtException', (e) => {
            console.log('uncaught exception', e);
            this.sendError();
        })

    }

    async handler(req, res) {
        // console.log('-----request-----');
        this._req = req;
        this._res = res;
        let {pathname} = url.parse(req.url, true);
        let fullPath = path.join(this.cwd, decodeURIComponent(pathname));
        try {
            let stats = await fsp.stat(fullPath);
            let rs;
            if (stats.isDirectory()) {
                try {
                    let readFile = util.promisify(fs.readFile);
                    rs = await readFile(path.join(fullPath, 'index.html'), 'utf8')
                } catch (e) {
                   // console.log('11', e);
                    let dirs = await fsp.readdir(fullPath);
                    if (pathname === '/') pathname = '';
                    rs = ejs.render(tpl, {dirs, parent: pathname}, {async: false});
                }

            } else {
                if (this.checkCacheInvalid(stats)) return this.sendFile(null);
                rs = fs.createReadStream(fullPath);
            }
            this.sendFile(rs, mime.getType(fullPath) || 'text/html', stats);

        } catch (e) {
            //console.log('22', e);
            this.sendError();

        }


    }

    sendError(e) {
        this._res.statusCode = 404;
        this._res.end(e || 'Not Found');
    }

    sendFile(rs, type, stats) {

        if (rs === null) {
            this._res.statusCode = 304;
            return this._res.end();
        }
        this.setCacheHeaders(type, stats);
        this._res.statusCode = 200;
        if (typeof rs !== 'string') {
            let compress = this.createCompress();
            if (compress) rs.pipe(compress).pipe(this._res);
            else rs.pipe(this._res);
        } else {

            this.gzip(rs).then(data => this._res.end(data));
        }


    }


    setCacheHeaders(type, stats) {
        this._res.setHeader('Content-Type', `${type};charset=utf8`);
        // this._res.setHeader('Expires', new Date(Date.now() + 1000 * 10).toUTCString());
        this._res.setHeader('Cache-Control', 'max-age=86400');
        this._res.setHeader('Last-Modified', stats.ctime.toUTCString());
        this._res.setHeader('ETag', stats.size);

    }


    checkCacheInvalid(stats) {
        let ifModifiedSince = this._req.headers['if-modified-since'] || '';
        let ifNoneMatch = this._req.headers['if-none-match'] || '';
        //console.log(stats.size === Number(ifNoneMatch), stats.ctime.toUTCString() === ifModifiedSince)
        return stats.size === Number(ifNoneMatch) || stats.ctime.toUTCString() === ifModifiedSince;

    }

    createCompress() {

        let acceptEncoding = this._req.headers['accept-encoding'];
        //console.log(acceptEncoding)
        if (acceptEncoding) {
            acceptEncoding = acceptEncoding.toLowerCase();

            if (acceptEncoding.includes('gzip')) {
                this._res.setHeader('Content-Encoding', 'gzip');
                return zlib.createGzip();
            }
            if (acceptEncoding.includes('deflate')) {
                this._res.setHeader('Content-Encoding', 'deflate');
                return zlib.createDeflate();
            }

        }
        return null;
    }


    async gzip(buffer) {

        let gzip = util.promisify(zlib.gzip);
        this._res.setHeader('Content-Encoding', 'gzip');
        return await gzip(buffer)

    }


    static start(config) {

        return new Server(config);

    }

}

exports = module.exports = Server;