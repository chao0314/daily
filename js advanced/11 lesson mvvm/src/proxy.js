import {assert} from "./utils";

export default function proxy(target, cb) {
    assert(target && (cb instanceof Function), "invalid parameter");
    let targetTemp;
    if (Array.isArray(target)) {
        targetTemp = [];
        for (let i = 0; i < target.length; i++) {
            targetTemp[i] = proxy(target[i], cb);
        }
    } else if (typeof target === "object") {
        targetTemp = {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                targetTemp[prop] = proxy(target[prop], cb);
            }
        }
    } else {
        return target;
    }

    return new Proxy(targetTemp, {
        set(target, p, value) {
            Reflect.set(target, p, value);
            cb(p);
            return true;

        },
        get(target, p) {
            return Reflect.get(target, p);
        }
    })


}