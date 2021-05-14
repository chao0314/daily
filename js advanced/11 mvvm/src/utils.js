export function assert(exp, msg) {
    if (!exp) throw  new Error(msg || "assert error");
}

export function getDom(selector) {
    assert(selector);
    if (selector instanceof HTMLElement) return selector;
    if (typeof selector === "string") return document.querySelector(selector);
    assert(false, "invalid selector");
}

export function clone(target) {
    let res;
    if (Array.isArray(target)) {
        res = [];
        for (let i = 0; i < target.length; i++) {
            res[i] = clone(target[i]);
        }
    } else if (typeof target === "object") {
        res = {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                res[prop] = clone(target[prop]);
            }
        }

    } else {
        res = target;
    }

    return res;
}

export function compare(target, other) {
    if (typeof target !== typeof other) return false;
    if (Array.isArray(target)) {
        if (target.length !== other.length) return false;
        for (let i = 0; i < target.length; i++) {
            if (!compare(target[i], other[i])) return false;
        }
        return true;
    } else if (typeof target === "object") {
        for (let prop in target) {
            if (target.hasOwnProperty(prop) && other.hasOwnProperty(prop)) {
                if (!compare(target[prop], other[prop])) return false;
            } else {
                return false;
            }
        }
        return true;
    } else {
        return target === other;
    }

}

