const queue = Symbol("queue");

class Queue {
    constructor() {
        this[queue] = {};
    }

    on(event, handler) {
        assert(typeof event === "string");
        assert(handler instanceof Function);
        if (!this[queue][event]) {
            this[queue][event] = [handler];
        } else {
            this[queue].push(handler);
        }
    }

    emit(event, ...args) {
        assert(typeof event === "string");
        this[queue][event].forEach(handler => {
            handler(...args);
        })
    }

    off(event, handler) {
        assert(typeof event === "string");
        assert(handler instanceof Function);
        this[queue][event] = this[queue][event].filter(fn => fn !== handler);
        if (!this[queue][event].length) delete this[queue][event];

    }
}