let id = 0;
export default class Depend {
    constructor() {
        this.id = id++;
        this.watchers = new Map();
    }


    static setActiveWatcher(watcher) {
        Depend.watchStack.push(watcher);
        Depend.activeWatcher = watcher;

    }

    static getActiveWatcher() {

        return Depend.activeWatcher;
    }

    static clearActiveWatcher() {
        Depend.watchStack.pop();
        Depend.activeWatcher = Depend.watchStack[Depend.watchStack.length - 1];

    }

    static dependArray(arr, watcher) {

        arr.forEach(item => {

            item.__ob__ && item.__ob__.dep.addWatcher(watcher);
            if (Array.isArray(item)) Depend.dependArray(item, watcher);

        })


    }

    addWatcher(watcher) {
        // 收集 当前 active watcher
        let id = watcher.id;
        if (!this.watchers.get(id)) {
            this.watchers.set(id, watcher);
            //多对多 互相
            watcher.addDep(this);

        }


    }

    notify() {
        //通知依赖当前 value/dep 的watcher 更新

        this.watchers.forEach(w => w.update());

    }


}

Depend.activeWatcher = null;
Depend.watchStack = [];