export default class Depend {


    static setActiveWatcher(watcher) {
        Depend.activeWatcher = watcher;
    }

    static getActiveWatcher() {

        return Depend.activeWatcher;
    }

    static clearActiveWatcher() {

        Depend.activeWatcher = null;
    }


}

Depend.activeWatcher = null;