import {assert} from "./utils";

export default class VNode {
    constructor(option, context) {
        assert(option && option.el);
        this.$el = option.el;
        this.$context = context
    }

    render() {
        assert(false, "abstract function");
    }
}