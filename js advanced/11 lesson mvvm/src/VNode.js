import {assert} from "./utils";

export default class VNode {
    constructor(option, root) {
        assert(option && option.el);
        this.$el = option.el;
        this.$root = root || this;
    }

    render() {
        assert(false, "abstract function");
    }
}