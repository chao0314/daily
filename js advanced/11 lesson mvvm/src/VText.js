import VNode from "./VNode";
import {textParser} from "./expression";

export default class VText extends VNode {
    constructor(option, parent, context) {
        super(option, parent, context);
        this.$value = option.value;
        this._oldValue;
    }

    render() {
        let newValue = textParser(this.$value, this.$parent.$data, this.$context.$filters);
        if (newValue !== this._oldValue) {
            this.$el.nodeValue = newValue;
            this._oldValue = newValue;
            console.log("render----vtext", this.$name);
        }

    }
}