import {directiveParser, listenerParser} from "./parser";
import VNode from "./VNode";
import directives from "./directives";

export default class VElement extends VNode {
    constructor(option, root) {
        super(option, root);
        this.$tag = option.tag;
        this.$attrs = option.attrs;
        this.$children = option.children;//createVDomTree
        this.$directives = directiveParser(this.$attrs);
        this.$listener = listenerParser(this.$directives);
    }

    render() {
        this.$directives.forEach(dir => {
            directives[dir.name](this, dir);
        });
        this.$children.forEach(child => child.render());

    }

}