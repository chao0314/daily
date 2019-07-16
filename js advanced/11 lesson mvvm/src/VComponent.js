import VNode from "./VNode";
import VElement from "./VElement";

export default class VComponent extends VElement {
    constructor(option, root) {
        super(option, root);
        this.$data = option.data;
    }

    render() {

    }
}