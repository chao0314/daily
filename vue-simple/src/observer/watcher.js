import Depend from "./depend";
export default class Watcher {
    constructor(vm, updateComponent, cb) {
        this.vm = vm;
        this.updateComponent = updateComponent;
        this.callback = cb;

        this.update();


    }


    update() {
        Depend.setActiveWatcher(this);
        this.updateComponent();
        Depend.clearActiveWatcher();

    }
}