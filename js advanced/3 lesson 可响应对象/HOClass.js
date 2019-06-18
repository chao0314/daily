Object.prototype.assert = Object.prototype.assert || function assert(reg, msg) {
    if (!reg) throw new Error(msg);
};
// let pool = new Map();
class State {
    constructor() {
        this._state = {};
    }

    get(key) {
        this.assert(typeof key === "string");
        return this._state[key];
    }

    set(key, value) {
        this._state[key] = value;
    }

    wrapper(target) {
        assert(target instanceof Function && target.toString().includes("class"));
        let that = this;
        return class extends target {
            constructor(...args) {
                super(...args);
                this.set = that.set.bind(that);
                this.get = that.get.bind(that);
            }

        }
    }
}

const state = new State();
const One = state.wrapper(class {
    constructor(){
        this.name = "one";
    }
});

const  Two = state.wrapper(class  {
    constructor(){
        this.name ='two';
    }
});


let one = new One();
let two = new Two();
two.set("test","123");
console.log(one.get("test"))


