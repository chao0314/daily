class Parent {
    constructor() {
        this.p = "parent";
        return new Proxy(this, {
            get(target, p, receiver) {
                console.log("to do get", p);
                return Reflect.get(target, p);
            },
            set(target, p, value, receiver) {
                console.log("to do set", p);
                return Reflect.set(target, p, value);
            }
        })
    }
}

class Sub extends Parent {

    constructor() {
        super();
        this.sub = "sub";
    }
}

let s = new Sub();

console.log(s.p);
s.p = "123";
console.log(s.p);
console.log(s.sub);
s.sub = "321";
console.log(s.sub);

let p = new Parent();
console.log(p.p);
p.p = "qwe";
console.log(p.p);

let s2 = new Sub();
console.log(s2.sub);
s2.sub = "s2123";
console.log(s2.sub)


console.log("-------------------------");

class Sup {
    constructor() {
        this.sup = "sup";
    }

}

const sproxy = new Proxy(Sup, {
    construct(target, argArray, newTarget) {
        console.log("---to do construct----");
        return new Proxy(new target(...argArray), {
            get(target, p, receiver) {
                console.log("to do get", p);
                return Reflect.get(target, p);
            },
            set(target, p, value, receiver) {
                console.log("to do set", p);
                return Reflect.set(target, p, value);
            }

        })
    }
});

class SubP extends sproxy {
    constructor() {
        super();
        this.sub = "sub"
    }

}
let sp = new SubP();
console.log(sp.sup);
sp.sup = "123";
console.log(sp.sup);
// console.log(sp)
console.log("-----------------------");
let sp2 = new SubP();
console.log(sp2.sup);
sp2.sup = "123";
console.log(sp2.sup);

console.log("----------------------");




