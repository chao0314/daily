const path = require('path');
const mongoose = require('mongoose');

let r = path.parse(path.join(__dirname, './app/router'));
console.log(r)

class A {
    constructor() {
        this.name = 123
    }

    say() {

        let hello = () => {

            console.log(this)
            console.log(this.name);
        }

        hello();
    }


}

class B extends A {

    constructor() {
        super();
        this.name = 321;
    }


}

let b = new B();

// b.say();

console.log(B, B.constructor, B.prototype, B.hasOwnProperty('prototype'));
console.log(b, b.constructor, b.prototype, b.hasOwnProperty('prototype'));


let a = [1, 2, 3]

a.forEach(v => {
        if (v === 2) return;
        else console.log(v);
    }
)


function fn(...args) {

    console.log(Array.from(arguments))
    console.log(args)
}

fn(1, 2)
fn(3)
fn()

let o = {a: 1}
console.log(o.hasOwnProperty('prototype'))

class Person {

    constructor() {
        this.name = 'hello world';
        this.age = 18

        // console.log(Reflect.getOwnPropertyDescriptor(Person,"say"))
        // console.log(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(this),"action"))
        // this.action();
        // console.log(Reflect.ownKeys(Person).filter(key => typeof Person[key] === 'function'))
        // console.log(Reflect.ownKeys(Reflect.getPrototypeOf(this)).filter(key => typeof this[key] === 'function' && key  !=='constructor'))

        this.action();
        return {
            age: 188
        }

    }

    static say() {

        console.log(321);
    }

    action() {
        console.log('hello action' + this.age);
    }
}

new Person()

console.log('---------------------------------------------------------------------------------');

class One {
    constructor() {
        this.age = 18;
        // return {
        //     name: "one"
        // }
    }

    say() {

        console.log(this.age);
    }
}

class Two extends One {
    constructor() {
        super();
        this.age = 20
    }

    say() {

        super.say();
    }

}


let t = new Two();

console.log(t.age);
console.log(t.name)

t.say()
console.log('---------------------------------------------------------------------------');
let readUri = 'mongodb://reader:reader123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test?authSource=admin&replicaSet=rs0';
let writeUri = 'mongodb://writer:writer123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test?authSource=admin&replicaSet=rs0';
let superUri = 'mongodb://super:super@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test?authSource=admin&replicaSet=rs0';

// let reader = mongoose.connect(readUri, {useNewUrlParser: true, useUnifiedTopology: true});
// let writer = mongoose.createConnection(writeUri, {useNewUrlParser: true, useUnifiedTopology: true});
let uri = 'mongodb://writer:writer123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test';
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    replicaSet: 'rs0',
    readPreference: 'secondaryPreferred',
    w: 'majority',
    readConcern: {level: 'majority'},
    j: true
}
let db = mongoose.connect(uri, options);
// let db = mongoose.connect(superUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(ok => {
//     console.log('ok')
// }, error => console.log(error));

let userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    password: String
})

let User = mongoose.model('User', userSchema);
// const other = new User({name: "hi", password: '123456',age:18,gender:"female"});
// other.save().then(ok => console.log('save ok', ok), err => console.log(err));

setTimeout(() => {




    let result = User.find({name: {
        $in:['hello','world','hi']
        }}, function (error, data) {
        console.log(error)
        console.log(data)
    })
}, 3000);


