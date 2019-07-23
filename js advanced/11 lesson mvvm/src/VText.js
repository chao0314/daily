import VNode from "./VNode";
import {textParser} from "./expression";

export default class VText extends VNode {
    constructor(option, context, parent) {
        super(option, context);
        this.$value = option.value;
        this.$parent = parent
    }

    render() {
        let temp = textParser(this.$value, this.$parent.$data);
        console.log(temp);
        this.$el.nodeValue = temp
    }
}