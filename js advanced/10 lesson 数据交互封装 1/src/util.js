const urlParse = require("url");

export function assert(exp, msg = "error of assert") {
    if (!exp) throw  new Error(msg);
}

export function isObj(obj) {
    return typeof obj === "object" && !Array.isArray(obj);
}

export function merge(target, src, option) {
    assert(isObj(target));
    assert(isObj(src));
    assert(!option || (option && isObj(option)));
    if (option) {
        let {include, exclude} = option;
        assert(!include || !exclude, "only include or exclude");
        if (include) {
            assert(typeof include === "string" || Array.isArray(include));
            if (typeof include === "string" && src[include]) {
                target[include] = src[include];
            } else {
                include.forEach(function (prop) {
                    if (src[prop] !== void 0) {
                        target[prop] = src[prop];
                    }
                })
            }
        } else if (exclude) {
            assert(typeof exclude === "string" || Array.isArray(exclude));
            if (typeof exclude === "string") {
                exclude = [exclude];
            }
            for (let prop in src) {
                if (src.hasOwnProperty(prop) && !exclude.includes(prop) && src[prop] !== void 0) {
                    target[prop] = src[prop];
                }
            }

        }
    } else {
        for (let prop in src) {
            if (src.hasOwnProperty(prop) && src[prop] !== void 0) {
                target[prop] = src[prop];
            }
        }
    }
    return target;
}

export function clone(src) {
    let target;
    if (isObj(src)) {
        target = {};
        for (let p in src) {
            if (src.hasOwnProperty(p)) {
                target[p] = clone(src[p]);
            }
        }

    } else if (Array.isArray(src)) {
        target = [];
        src.forEach(v => {
            target.push(clone(v));
        })

    } else {
        target = src;
    }
    return target;

}

export function joinParams(params) {
    let s = [];
    for (let p in params) {
        if (params.hasOwnProperty(p)) {
            s.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
        }
    }
    return s.join('&');

}

export function handleOptions(defaults, method, ...args) {
    assert(args.length !== 0);
    let config = {method, headers: {}};
    if (args.length === 1) {
        let arg = args[0];
        if (typeof arg === "string") {
            config.url = urlParse(defaults.baseUrl, arg);
        } else if (isObj(arg)) {
            assert(typeof arg.url === "string");
            if (!config.method) config.method = defaults.method;
            config.url = urlParse.resolve(defaults.baseUrl, arg.url);
            if (!config.method) config.method = arg.method || defaults.method;
            config.data = arg.data;
            initConfigFromObj(arg);

        }

    } else if (args.length === 2) {
        let [first, second] = Array.from(args);
        assert(typeof first === "string");
        assert(isObj(second));
        config.url = urlParse(defaults.baseUrl, first);
        if (!config.method) config.method = second.method || defaults.method;
        if (config.method.toLowerCase() === "post") {
            config.data = second;
            merge(config.headers, defaults.headers.common);
            merge(config.headers, defaults.headers[config.method]);
        } else {
            initConfigFromObj(second);
        }

    } else if (args.length === 3) {
        assert(method.toLowerCase() === "post", "invalid parameter");
        let [first, second, third] = Array.from(args);
        assert(typeof first === "string");
        assert(isObj(second) && isObj(third));
        config.url = urlParse(defaults.baseUrl, first);
        config.data = second;
        initConfigFromObj(third);

    }
    return config;

    function initConfigFromObj(obj) {
        if (obj.params && isObj(obj.params)) config.url = `${config.url}?${joinParams(obj.params)}`;
        merge(config.headers, defaults.headers.common);
        merge(config.headers, defaults.headers[config.method]);
        if (isObj(obj.headers)) merge(config.headers, obj.headers);
        merge(config, defaults, {exclude: ["baseUrl", "method", "headers"]});
        merge(config, obj, {exclude: ["baseUrl", "method", "headers"]})
    }


}

