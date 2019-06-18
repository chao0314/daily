let obj = {_b: 123};
Reflect.defineProperty(obj, "b", {
    set(val) {
        console.log("set to do");
        obj._b = val;
    },
    get() {
        console.log("get to do");
        return obj._b;
    }

});

// console.log(obj.b);
// obj.b = "321";
// console.log(obj.b);

class Accessor {
    constructor(fn){
        let data = fn();
        for (let prop in data){
            if(data.hasOwnProperty(prop)){
                Reflect.defineProperty(this,prop,{
                    set(val){
                        console.log("to do set render");
                        data[prop] = val
                    },
                    get(){
                        console.log("to do get");
                        return data[prop];
                    }
                })
            }
        }
    }

}
let a = new Accessor(function () {
    return {
        a:1,
        b:2
    }
});

console.log(a.a);
console.log(a.b);
a.a = 123;
a.b= 321;
console.log(a.a);
console.log(a.b);
