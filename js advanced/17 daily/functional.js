function curry(fn, ...args) {

    if (fn.length > args.length) {

        return (...others) => curry(fn, ...args, ...others);

    } else {

        return fn(...args);

    }
}

let toString = ctx => String.prototype.toString.bind(ctx)();

console.log(toString('hello'));
console.log('hello'.toString())

function compose(fns) {

    return (value) => fns.reduce((acc, cur) => {

        return cur(acc);
    }, value)

}


function compose2(...fns) {

    return fns.reduce((acc, cur) => {

        return function (...value) {

           return  cur(acc(...value));
        }
    })

}


function one(number) {
    return number + ' 1';
}

function two(number) {
    return number + ' 2';
}

function three(number) {
    return number + ' 3';
}


console.log(three(two(one(0))));

console.log(compose([one, two, three])(0))
console.log(compose2(one,two,three)(0))