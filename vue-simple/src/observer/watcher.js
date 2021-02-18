import Depend from "./depend";
import updateQueue from "../utils/updateQueue";

let id = 0;

export default class Watcher {
    constructor(vm, expOrFn, cb, options = {}) {
        this.vm = vm;
        this.id = id++;
        this.value = null;//watch  computed有用
        this.callback = cb;
        this.dependence = new Map();
        this.isCustomWatch = options.isCustomWatch || false;
        this.isComputedWatch = options.isComputedWatch || false;
        this.computedCacheIsValid = false;
        if (this.isCustomWatch) {
            this.watchKey = expOrFn;
            this.getWatchValueFn = function () {
                let aKey = this.watchKey.split(".");
                return aKey.reduce((pre, cur) => pre[cur], this.vm);
            }
            this.watchUpdatedFn = cb;
        } else if (this.isComputedWatch) {
            this.getComputedValueFn = expOrFn;

        } else this.updateComponentFn = expOrFn;


        this.initUpdate();


    }

    updateComponent() {
        // console.log("update Component or watch or computed");
        if (this.isCustomWatch) {

            let newV = this.getWatchValueFn();
            this.watchUpdatedFn.call(this.vm, newV, this.value);
            this.value = newV;
        }
            // } else if (this.isComputedWatch) {
            //
            //     console.log("---isComputedWatch---update----")
            //
            //     this.computedCacheIsValid = false;
            //
        // }
        else this.updateComponentFn();

        this.callback && this.callback();

    }

    initUpdate() {
        // 组件首次渲染时需要收集依赖，即该组件依赖哪些数据，数据被那些组件依赖，多对多的关系，js单线程不会造成依赖关系的冲突混乱。
        Depend.setActiveWatcher(this);
        if (this.isCustomWatch) {
            //借助 defineProperty 的 getter, custom watch 收集依赖
            this.value = this.getWatchValueFn();

        } else if (this.isComputedWatch) {

            this.value = this.getComputedValueFn.call(this.vm);
            this.computedCacheIsValid = true;

        } else this.updateComponent();
        Depend.clearActiveWatcher();

    }

    update() {
        // 依赖的数据更新了，此时需要更新组件，重新渲染
        //异步渲染

        if (this.isComputedWatch) {
            // computed 的更新是同步的，否则若是异步的，在组件取值时候，computedCache 的值未变
            this.computedCacheIsValid = false;

            //update queue invoke updateComponent real
        } else updateQueue.push(this);


    }

    addDep(dep) {
        let id = dep.id;
        if (!this.dependence.get(id)) {
            this.dependence.set(id, dep);
        }


    }

    addOwnDepToActiveWatcher(activeWatcher) {

        this.dependence.forEach(dep => dep.addWatcher(activeWatcher));

    }
}