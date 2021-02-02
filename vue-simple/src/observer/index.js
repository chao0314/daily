import {isObj} from "../utils/index";
import hijackArray from "./array";
import Depend from "./depend";

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
        // one prop/key  one dep, one dep maybe has many watcher
        //one  component has one watcher, one watcher normal has many dep
        let dep = new Depend();
        //  typeof value also  maybe is obj
        observe(value);
        Object.defineProperty(obj, key, {

            get() {
                console.log('reactive get', key, value);

                if (Depend.getActiveWatcher()) {





                }

                return value;
            },
            set(newVal) {
                if (newVal !== value) {
                    console.log('reactive set', key, value);
                    // typeof new value is obj
                    observe(newVal);
                    value = newVal;
                }

            }
        })


    }


}


export default function observe(data) {


    if (typeof data !== 'object') return;
    if (data.__ob__) return data;

    return new Observer(data);

}