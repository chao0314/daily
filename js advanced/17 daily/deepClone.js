function deepClone(target, map = new WeakMap) {


    if (target === null || target === undefined) return target;
    // Function
    // number string
    if (typeof target === 'function' || typeof target === 'number' || typeof target === 'string')
        return target;

    //Date
    if (target instanceof Date) return new Date(target);
    //RegExp
    if (target instanceof RegExp) return new RegExp(target);
    // Symbol
    if (typeof target === 'symbol') return Symbol(target.description);


    const cloned = map.get(target);
    if (cloned) return cloned;

    // Array
    let cloneTarget;
    if (Array.isArray(target)) {
        cloneTarget = [];
        map.set(target, cloneTarget);
        for (let i = 0; i < target.length; i++) {

            cloneTarget[i] = deepClone(target[i], map);
        }

    } else if (target instanceof Map) {

        // map里简单处理

        cloneTarget = new Map();
        map.set(target, cloneTarget);
        target.forEach((value, key) => {

            cloneTarget.set(key, deepClone(value, map));

        })

    } else if (target instanceof Set) {

        cloneTarget = new Set();
        map.set(target, cloneTarget);
        target.forEach(value => {

            cloneTarget.add(deepClone(value, map));
        })
    } else if (typeof target === 'object') {

        cloneTarget = {};
        map.set(target, cloneTarget);
        const keys = Reflect.ownKeys(target);
        // 包含 symbol等
        console.log('---',keys)

        for (const key of keys) {

            cloneTarget[key] = deepClone(target[key], map);
        }


    }

    return  cloneTarget;


}


// 测试代码
let s1 = Symbol("aaa")
let s2 = Symbol("bbb")

const obj = {
    name: "why",
    age: 18,
    friend: {
        name: "james",
        address: {
            city: "广州"
        }
    },
    // 数组类型
    hobbies: ["abc", "cba", "nba"],
    // 函数类型
    foo: function (m, n) {
        console.log("foo function")
        console.log("100代码逻辑")
        return 123
    },
    // Symbol作为key和value
    [s1]: "abc",
    s2: s2,
    // Set/Map
    set: new Set(["aaa", "bbb", "ccc"]),
    map: new Map([["aaa", "abc"], ["bbb", "cba"]])
}

// 循环引用
obj.info = obj

const newObj = deepClone(obj)

console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"

console.log(newObj)
console.log(newObj.s2 === obj.s2)

console.log(newObj.info.info.info)