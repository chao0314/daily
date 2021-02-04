import Depend from "./depend";
import updateQueue from "../utils/updateQueue";

let id = 0;

export default class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm;
        this.id = id++;
        this.value = null;//watch 有用
        this.callback = cb;
        this.dependence = new Map();
        this.isCustomWatch = options.isCustomWatch || false;
        if (this.isCustomWatch) {
            this.watchKey = expOrFn;
            this.getWatchValueFn = function () {
                let aKey = this.watchKey.split(".");
                return aKey.reducer((pre, cur) => pre[cur], this.vm);
            }
            this.watchUpdatedFn = cb;
        } else this.updateComponentFn = expOrFn;


        this.initUpdate();


    }

    updateComponent() {
        console.log("update Component or watch");
        if (this.isCustomWatch) {

            let newV = this.getWatchValueFn();
            this.watchUpdatedFn(newV, this.value);
            this.value = newV;

        } else this.updateComponentFn();
        this.callback && this.callback();

    }

    initUpdate() {
        // 组件首次渲染时需要收集依赖，即该组件依赖哪些数据，数据被那些组件依赖，多对多的关系，js单线程不会造成依赖关系的冲突混乱。
        Depend.setActiveWatcher(this);
        if (this.isCustomWatch) {

            //借助 defineProperty 的 getter, custom watch 收集依赖
            this.value = this.getWatchValueFn();


        } else this.updateComponent();
        Depend.clearActiveWatcher();

    }

    update() {
        // 依赖的数据更新了，此时需要更新组件，重新渲染
        //异步渲染
        updateQueue.push(this);


    }

    addDep(dep) {
        let id = dep.id;
        if (!this.dependence.get(id)) {
            this.dependence.set(id, dep);
        }


    }
}