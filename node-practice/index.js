// function fn(a,b,c) {
//
// }
//
// console.log(fn.length);

function One() {
    this.name = 'one';
}


One.prototype.say = function () {
    console.log(this.name)
};
let p = {
    say() {
        console.log('p', this.name)
    },
    name: 'p'
};

let one = new One();
one.say();
Object.setPrototypeOf(one, p);
one.say();
console.log(one.__proto__ === p);
console.log(Object.getPrototypeOf(one) === p);



class Person{
    constructor(name) {
        this.name=name;
    }
}


class Student extends Person {

    say(){}
}




