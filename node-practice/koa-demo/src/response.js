class Response {

    constructor(res) {
        this.res = res;
        this._body = void 0;
    }

    get body() {

        return this._body;
    }

    set body(data) {

        this.res.statusCode = 200;
        this._body = data;
    }

}

exports = module.exports = Response;