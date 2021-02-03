import nextTick from "./nextTick";

class UpdateQueue {

    constructor() {
        this.watcherQueue = [];
    }

    push(watcher) {
        let w = this.watcherQueue.find(item => item.id === watcher.id);
        if (!w) {
            this.watcherQueue.push(watcher);
            nextTick(() => {
                console.log('start async update queue');
                this.asyncUpdate();
            });
        }

    }

    asyncUpdate() {

        this.watcherQueue.forEach(w => w.updateComponent());
        this.watcherQueue = [];
    }


}

export default new UpdateQueue();