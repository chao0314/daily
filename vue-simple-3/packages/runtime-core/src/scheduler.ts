let isPending = false;
const queue = [];

export function queueJob(effect) {

    if (!queue.includes(effect)) {
        queue.push(effect);
        flushQueue();
    }

}

function flushQueue() {
    if (!isPending) {
        isPending = true;
        return Promise.resolve().then(executeJob)
    }

}

function executeJob() {

    queue.sort((a, b) => a.id - b.id);

    for (let i = 0; i < queue.length; i++) {

        queue[i]();
    }
    queue.length = 0;
    isPending = false;

}