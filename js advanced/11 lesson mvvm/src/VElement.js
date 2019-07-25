import {directiveParser, listenerParser} from "./parser";
import {createVDomTree} from "./createVDomTree";
import {domParser} from "./parser";
import VNode from "./VNode";
import VComponent from "./VComponent";

export default class VElement extends VNode {
    constructor(option, context, parent) {
        super(option, context, parent);
        this.$tag = option.tag;
        this.$attrs = option.attrs;
        this.$children = option.children;//createVDomTree
        this.$directives = directiveParser(this.$attrs);
        this.$listener = listenerParser(this.$directives);
        this.$$data = {};
        this.$data = new Proxy(this.$$data, {
            get: (target, p) => {
                return this._get(p);
            },
            set: (target, p, value) => {
                this.$context.$data[p] = value;
                return true;
            }

        });


        //todo init status
        this.$directives.forEach(dir => {
            this.$context.$$directives[dir.name].init && this.$context.$$directives[dir.name].init(this, dir);
        })
    }

    _get(name) {
        let cur = this;
        while (cur) {
            if (cur instanceof VElement && cur.$$data[name] !== void 0) return cur.$$data[name];
            else if (cur instanceof VComponent && cur.$data[name] !== void 0) return cur.$data[name];
            cur = cur.$parent;
        }
    }

    _set(name, value) {
        this.$$data[name] = value;
    }

    render() {
        this.$directives.forEach(dir => {
            this.$context.$$directives[dir.name].update && this.$context.$$directives[dir.name].update(this, dir);
        });
        this.$children.forEach(child => child.render());
        console.log("render,velement", this.$name);
    }

    clone() {
        let el = this.$el.cloneNode(true);
        if (el.hasAttribute("v-for")) el.removeAttribute("v-for");
        return createVDomTree(domParser(el), this.$parent, this.$context);
    }
}