const PromiseA = require('./promiseA');
/*
* let p = new PromiseA((resolve, reject) => {
    setTimeout(resolve(1), 2000);

});

console.log('---');

let p2 = p.then(value => {
    console.log(value);
    return 2
});

let p3 = p2.then(value => {
    console.log(value);
    console.log(a);
});

p3.catch(reason => {
    console.log("catch", reason);
});

let pa1 = new PromiseA(resolve => {
    setTimeout(resolve(1000), 1000)
});

let pa2 = new PromiseA(resolve => {
    setTimeout(resolve(2000), 2000)
});

PromiseA.all([pa1, pa2]).then(data => console.log(data));
PromiseA.race([pa1, pa2]).then(data => console.log("race", data));
*
*
* */



console.log('---------------------')

// async function f() {
//     console.log(1);
//     await new Promise(resolve => resolve(console.log(2)));
//     console.log(3);
// }
//
// f();
// console.log(4);
console.log('=============================');

async function fa() {
    console.log(1);
    await new PromiseA(resolve => resolve(console.log(2)));
    console.log(3);
}

fa();
console.log(4);