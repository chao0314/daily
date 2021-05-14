import {assert} from "./utils";

const _events = {};

export default class EventQueue {

    $on(event, listener) {
        assert(typeof event === 'string');
        assert(listener instanceof Function);
        let queue = _events[event];
        listener = listener.bind(this.$data);
        if (queue) {
            return queue[event].push(listener) - 1;
        } else {

            _events[event] = [listener];
            return 0;
        }
    }

    $emit(event, payload) {
        assert(typeof event === 'string');
        _events[event].forEach(function (listener) {
            listener(payload);
        })
    }


    $off(event, id) {
        assert(typeof event === 'string');
        _events[event].splice(id, 1);
    }


}