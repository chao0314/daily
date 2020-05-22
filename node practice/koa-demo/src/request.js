const url = require('url');

class Request {
    constructor(req) {
        this.req = req;
        this.oUrl = url.parse(this.url, true);
    }

    get url() {
        return this.req.url;
    }

    get pathname() {
        return this.oUrl.pathname;
    }
}

exports = module.exports = Request;