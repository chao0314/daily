// const obj = require('./thrid');
// const edit = require("./other");
//
// console.log(obj.name);
// edit();
// setTimeout(() => {
//     console.log('now name is ', obj.name);
// }, 4000);

class Test {
    constructor() {
        this.index = 0;
        this.data = Symbol('data');
        this[this.data] = new Array(10).fill(1);
    }

    next() {
        if (this.index < 10) {
            this.index++;
            return {value: this.index, done: this.index === 9};
        }
    }


    [Symbol.iterator]() {
        return this;

    }

}

// let t = new Test();
// // for (let v of t) {
// //     console.log(v);
// // }


let a = [1, 2, 3, 4, 5];

// console.log(a.copyWithin(0, 3, 5));

function template(arr, ...values) {

    console.log(arr, values);

    let res = '';
    for (let i = 0; i < arr.length; i++) {

        res += (arr[i] + (values[i] ? `(${values[i]})` : ''));

    }
    return res;
}

let name = 'hello';
let age = 18;

// console.log(template`<div>${name}</div><div>${age}</div>`);

let buf = new ArrayBuffer(8);

let int8 = new Int8Array(buf);
int8[0] = 100;
console.log(int8);
let int16 = new Int16Array(buf);
int16 [3] = 300;

console.log(int16);


let dv = new DataView(buf);

dv.setInt8(0, 88);
dv.setInt16(2, 288, true);
console.log(dv.getInt16(0, true));
console.log(dv.getInt16(2, true));


function remember() {
    if (remember._index) remember._index--;
    else remember._index = 2;
    if (remember._index === 0) console.log('0000');

}

remember();
remember();
remember();


Function.prototype.before = function (callback) {

    return () => {
        callback();
        this();
    }
};

function say() {
console.log('say')
}


let o = say.before(function () {
    console.log('callback')
});
o();



