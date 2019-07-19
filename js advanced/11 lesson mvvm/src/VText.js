import VNode from "./VNode";
import {textParser} from "./expression";

export default class VText extends VNode {
    constructor(option, root) {
        super(option, root);
        this.$value = option.value;
    }

    render() {
        let inner = textParser(this.$value, this.$root.$data);
        console.log(inner);
        this.$el.nodeValue = inner;
    }
}