import {assert} from "./utils";

const uuid = require("uuid/v4");

export default class VNode {
    constructor(option, parent, context) {
        assert(option && option.el);
        this.$el = option.el;
        this.$parent = parent;
        this.$context = context;
        this.$name = uuid();
    }

    render() {
        assert(false, "abstract function");
    }
}