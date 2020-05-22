const Request = require('./request');
const Response = require('./response');

class Context {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.request = new Request(req);
        this.response = new Response(res);

    }

    get body() {
        return this.response.body;
    }

    set body(data) {

        this.response.body = data;
    }

    get url() {
        return this.request.url;
    }

    get pathname() {
        return this.request.pathname;
    }

    get method() {

        return this.res.method;
    }

}

exports = module.exports = Context;