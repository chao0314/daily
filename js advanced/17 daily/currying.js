// 柯里化 让函数变得更具体一些
//bind函数 底层机制 理解柯里化
// isType context type   => isString isBoolean


function add(a, b, c, d) {

    return a + b + c + d;
}

function currying(fn, ...args) {

    if (fn.length > args.length) {

        return function (...others) {

            return currying(fn, ...args, ...others);
        }
    } else {

        return fn(...args);
    }

}


let fn = currying(add, 1, 2);
let fn2 = fn(3);
console.log(fn2(4));
console.log(currying(add)(1)(2)(3)(4));


/*
扩展：
* sum(1)(2)(3)  6;
  sum(1, 2, 3)(4)  10;
  sum(1)(2)(3)(4)(5)  15;
* */


function sum(...args) {

    let fn = function (...others) {
        fn._args.push(...others);
        return fn;
    };
    fn._args = [...args];
    Object.defineProperty(fn, 'end', {
        get() {
            return fn._args.reduce((pre, cur) => {
                return pre + cur;
            })

        }
    });
    return fn;

}

console.log(sum(1)(2)(3).end);
console.log(sum(1, 2, 3)(4).end);
console.log(sum(1)(2)(3)(4)(5).end);

// 反柯里化  让一个函数的应用范围 变得更广一些
//例如 Object.prototype.toString

function unCurrying(fn) {
    return function (context, ...args) {
        return Reflect.apply(fn, context, args);
    }

}

let toString = unCurrying(Object.prototype.toString);
console.log(toString('hello'));

console.log(Object.prototype.toString.apply('hello'))



