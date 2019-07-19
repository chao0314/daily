import {assert} from "./utils";

export default function proxy(target, staticData, cb) {
    assert(target !== void 0 && (cb instanceof Function), "invalid parameter");
    let targetTemp;
    if (Array.isArray(target)) {
        targetTemp = [];
        for (let i = 0; i < target.length; i++) {
            targetTemp[i] = proxy(target[i], staticData, cb);
        }
    } else if (typeof target === "object") {
        targetTemp = {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                assert(!/^$/.test(prop), "data key can't start with $");
                targetTemp[prop] = proxy(target[prop], staticData, cb);
            }
        }
    } else {
        return target;
    }

    return new Proxy(targetTemp, {
        set(target, p, value) {
            if (/object/.test(typeof p)) p = proxy(p, staticData, cb);
            Reflect.set(target, p, value);
            cb(p);
            return true;

        },
        get(target, p) {
            if (staticData[p]) return staticData[p];
            return Reflect.get(target, p);
        }
    })


}