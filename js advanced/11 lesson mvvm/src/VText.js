import VNode from "./VNode";
import {textParser} from "./expression";

export default class VText extends VNode {
    constructor(option, context) {
        super(option, context);
        this.$value = option.value;
    }

    render() {
        this.$el.nodeValue = textParser(this.$value, this.$context.$data);
    }
}