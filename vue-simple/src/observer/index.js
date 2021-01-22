import {isObj} from "../utils/index";
import hijackArray from "./array";

class Observer {
    constructor(data) {

        //__ob__ 用于在数组操作时能够引用到 Observer 实例的相应的方法
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false
        })

        if (isObj(data)) {

            this.observeObj(data);

        } else if (Array.isArray(data)) {

            this.observeArray(data);
        }


    }

    observeObj(obj) {

        Object.keys(obj).forEach(key => this.defineReactive(obj, key, obj[key]))


    }

    observeArray(arr) {

        // need to hijack some methods,for example: push、 pop and so on.
        hijackArray(arr);
        arr.forEach(item => observe(item));

    }


    defineReactive(obj, key, value) {
        //  typeof value also is obj
        observe(value);
        Object.defineProperty(obj, key, {

            get() {
                console.log('reactive get', key, value);
                return value;
            },
            set(newVal) {
                console.log('reactive set', key, value);
                // typeof new value is obj
                observe(newVal);
                value = newVal;

            }
        })


    }


}


export default function observe(data) {


    if (typeof data !== 'object') return;
    if (data.__ob__) return;

    new Observer(data);

}