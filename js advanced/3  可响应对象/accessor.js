class Accessor {
    constructor(){
        this._data = "private";
    }

    get data(){
        console.log("to do some");
        return this._data;
    }
    set data(val){
        console.log("to do some set");
        this._data = val;
    }


}
let a = new Accessor();
console.log(a.data);
a.data = "123";
console.log(a.data);
