function one(number) {
    return number + ' 1';
}

function two(number) {
    return number + ' 2';
}

function three(number) {
    return number + ' 3';
}

function compose(...fns) {

    return fns.reduce((pre, cur) => {

        return function (...args) {
            return cur(pre(...args));
        }

    });

}


let fn = compose(one, two, three);
console.log(fn(0));
console.log(three(two(one(0))));

console.log(this === module.exports);
console.log('------------------')

