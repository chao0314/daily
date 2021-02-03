import Depend from "./depend";
import updateQueue from "../utils/updateQueue";

let id = 0;

export default class Watcher {
    constructor(vm, updateComponent, cb) {
        this.vm = vm;
        this._updateComponent = updateComponent;
        this.callback = cb;
        this.id = id++;
        this.dependence = new Map();

        this.initUpdate();


    }

    updateComponent() {
        console.log("updateComponent");
        this._updateComponent();
        this.callback && this.callback();

    }

    initUpdate() {
        // 组件首次渲染时需要收集依赖，即该组件依赖哪些数据，数据被那些组件依赖，多对多的关系，js单线程不会造成依赖关系的冲突混乱。
        Depend.setActiveWatcher(this);
        this.updateComponent();
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