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
        // observer 的自有dep 用于收集使用该对象的 watcher,以便于后续 $set 扩展
        this.dep = new Depend();


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
        // 如果 value 是基本类型，则 ob为 undefined，因为基本类型无需再观测，只需 set/get时进行相应处理即可。
        let ob = observe(value);
        Object.defineProperty(obj, key, {

            get() {
                // console.log('reactive get', key, value);
                let activeWatcher = Depend.getActiveWatcher();
                // console.log(" get activeWatcher",activeWatcher)
                if (activeWatcher) {
                    // 每个属性需要收集此时的 active watcher,即使是类似 {{user}} data(){return {user:{name:"hello"}}}对象，
                    //由于在模板渲染的时候有 JSON.stringify 仍会执行到每个具体字段(name)的 get
                    dep.addWatcher(activeWatcher);

                    if (ob) {
                        // value 是对象或数组,本身也需要收集此时的 active watcher，便于后续 $set
                        ob.dep.addWatcher(activeWatcher);

                    }

                    // value 是数组，那么数组的每个子元素如果是对象或数组，也要收集此时的 active watcher，尤其还需要考虑多层数组
                    if (ob && Array.isArray(value)) {
                        Depend.dependArray(value, activeWatcher);

                    }


                }

                return value;
            },
            set(newVal) {
                if (newVal !== value) {
                    // console.log('reactive set', key, newVal);
                    // typeof new value is obj
                    observe(newVal);
                    value = newVal;
                    // notify  these watchers update who depend this value;
                    dep.notify();
                }

            }
        })


    }


}


export default function observe(data) {


    if (typeof data !== 'object') return;
    if (data.__ob__) return data.__ob__;

    return new Observer(data);

}