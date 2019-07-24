import VNode from "./VNode";
import {textParser} from "./expression";

export default class VText extends VNode {
    constructor(option, parent, context) {
        super(option, parent, context);
        this.$value = option.value;
    }

    render() {
        this.$el.nodeValue = textParser(this.$value, this.$parent.$data);
        console.log("render,vtext",this.$name);
    }
}