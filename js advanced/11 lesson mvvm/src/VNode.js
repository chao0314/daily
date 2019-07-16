import {assert} from "./utils";

export default class VNode {
    constructor(option, root) {
        assert(option && option.el);
        assert(root);
        this.$el = option.el;
        this.$root = root;
    }

    render() {
        assert(false, "abstract function");
    }
}