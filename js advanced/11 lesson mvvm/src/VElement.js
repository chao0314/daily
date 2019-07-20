import {directiveParser, listenerParser} from "./parser";
import VNode from "./VNode";

export default class VElement extends VNode {
    constructor(option, context) {
        super(option, context);
        this.$tag = option.tag;
        this.$attrs = option.attrs;
        this.$children = option.children;//createVDomTree
        this.$directives = directiveParser(this.$attrs);
        this.$listener = listenerParser(this.$directives);
        //todo init status
        this.$directives.forEach(dir => {
            this.$context.$$directives[dir.name].init && this.$context.$$directives[dir.name].init(this, dir);
        })
    }

    render() {
        this.$directives.forEach(dir => {

            this.$context.$$directives[dir.name].update && this.$context.$$directives[dir.name].update(this, dir);
        });
        this.$children.forEach(child => child.render());

    }

}