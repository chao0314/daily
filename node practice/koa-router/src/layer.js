class Layer {
    constructor(path, method, handler, options) {
        this.path = path;
        this.method = method;
        this.stack = Array.isArray(handler) ? handler : [handler];
    }

    match(path, method) {

        return this.path === path && this.method === method;
    }

    setPrefix(prefix) {

        this.path = prefix + this.path;
    }

}

exports = module.exports = Layer