const iPromise = require('./index');

// let ip = new iPromise((resolve, reject) => {
//
//     console.log('this is executor');
//     resolve('ok');
// });
//
// ip.then(result => {
//     console.log(result);
// }, error => {
//     console.log(error)
// });

console.log('-------------------------------------');
// let p1 = new iPromise((resolve, reject) => {
//     console.log("1 start");
//     resolve(1);
//     reject(1);
//
// });
//
// let p2 = p1.then((result) => {
//     console.log("2", result);
//     return 2;
// });
// let p3 = p2.then((result) => {
//     console.log("3", result);
//     // console.log(result);
// });
// // console.log(p1 === p2);


// let a1 = new iPromise((resolve, reject) => {
//     setTimeout(resolve(1), 10);
//
// });
//
// let a2 = new iPromise((resolve, reject) => {
//     setTimeout(reject("---error---"), 100);
// });
// iPromise.all([a1, a2]).then(res => console.log(res)).catch(e => console.log(e));
//
// let p1 = new Promise(function(resolve) {
//     console.log(this)
//     resolve(1)
//
// });
//
// p1.finally(data => {
//     console.log(data)
// }).then(data => {
//     console.log(data);
// })

let a = [1, 2];
try {
    a.forEach(item => item.say());

} catch (e) {
    console.log("-111-",e);
}