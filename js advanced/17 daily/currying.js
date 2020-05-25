// ���ﻯ �ú�����ø�����һЩ
//bind���� �ײ���� �����ﻯ
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
��չ��
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

// �����ﻯ  ��һ��������Ӧ�÷�Χ ��ø���һЩ
//���� Object.prototype.toString

function unCurrying(fn) {
    return function (context, ...args) {
        return Reflect.apply(fn, context, args);
    }

}

let toString = unCurrying(Object.prototype.toString);
console.log(toString('hello'));

console.log(Object.prototype.toString.apply('hello'))



