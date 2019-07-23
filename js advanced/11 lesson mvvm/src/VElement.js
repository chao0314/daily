import {directiveParser, listenerParser} from "./parser";
import {createVDomTree} from "./createVDomTree";
import {domParser} from "./parser";
import proxy from "./proxy";
import VNode from "./VNode";

export default class VElement extends VNode {
    constructor(option, context) {
        super(option, context);
        this.$tag = option.tag;
        this.$attrs = option.attrs;
        this.$children = option.children;//createVDomTree
        this.$directives = directiveParser(this.$attrs);
        this.$listener = listenerParser(this.$directives);
        this.$data = proxy({}, this.$context.$data, () => {
            this.render();
        });
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

    clone() {
        let el = this.$el.cloneNode(true);
        if (el.hasAttribute("v-for")) el.removeAttribute("v-for");
        return createVDomTree(domParser(el), this.$context);
    }
}