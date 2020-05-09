const fs = require('fs');
const fsp = fs.promises;
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const mime = require('mime');
const path = require('path');
const tpl = fs.readFileSync(path.resolve(__dirname, './tpl/tpl.html'), {encoding: 'utf8'});

class Server {

    constructor(config = {}) {
        let {port, cwd} = config;
        this.port = port || 8090;
        this.cwd = cwd || process.cwd();
        this.service = http.createServer(this.handler.bind(this));
        this.service.listen(this.port, () => console.log('server on port 8090'));

    }

    async handler(req, res) {
        this._req = req;
        this._res = res;
        let {pathname} = url.parse(req.url, true);
        let fullPath = path.join(this.cwd, decodeURIComponent(pathname));
        try {
            let stats = await fsp.access(fullPath);
            if (stats.isDirectory()) {

                try {
                    let ws = fs.createReadStream(path.join(fullPath, 'index.html'));
                    return this.sendFile(ws);
                } catch (e) {
                    console.log(e);
                    let dirs = await fsp.readdir(fullPath);
                    ejs


                }


            }

        } catch (e) {
            console.log(e);
            this.sendError();

        }


    }

    sendError(e) {
        this._res.statusCode = 404;
        this._res.end(e || 'Not Found');
    }

    sendFile(ws) {

    }

    static start(config) {

        return new Server(config);

    }

}