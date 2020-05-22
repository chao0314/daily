class Layer {
    constructor(path, method, handler, options={}) {
        this.path = path;
        this.method = method;
        this.prefix = options.prefix || '';
        this.stack = Array.isArray(handler) ? handler : [handler];
    }

    match(path, method) {

        return this.prefix + this.path === path && this.method === method;
    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }

}

exports = module.exports = Layer;