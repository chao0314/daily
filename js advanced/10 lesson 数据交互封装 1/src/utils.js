export function assert(exp, msg = "error of assert") {
    if (!exp) throw  new Error(msg);
}

export function isObj(obj) {
    return obj instanceof Object && !Array.isArray(obj);
}

export function merge(target, src, option) {
    assert(isObj(target));
    assert(isObj(src));
    assert(!option || (option && isObj(option)));
    if (option) {
        let {include, exclude} = option;
        assert(include && exclude, "only include or exclude");
        if (include) {
            assert(include instanceof String || Array.isArray(include));
            if (include instanceof String && src[include]) {
                target[include] = src[include];
            } else {
                include.forEach(function (prop) {
                    if (src[prop]) {
                        target[prop] = src[prop];
                    }
                })
            }
        } else if (exclude) {
        }
    }

}