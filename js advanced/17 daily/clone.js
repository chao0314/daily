function deepClone(target, cache = new WeakMap()) {
    if (typeof target === 'object') {
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        //??????????
        let cloned = cache.get(target);
        if (cloned) return cloned;
        //????????
        let value = new target.constructor();
        cache.set(target, value);
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                value[prop] = deepClone(target[prop], cache);
            }

        }

        return value;

    }

    return target;


}

let b = {};
let a = {b: b};
b.a = a;
let newObj = deepClone(a);
console.log(newObj);


let c = deepClone(a);
c.say = "hello";
console.log(a, "---", c);

let d = new Date();
let d2 = deepClone(d);
console.log(d === d2);
