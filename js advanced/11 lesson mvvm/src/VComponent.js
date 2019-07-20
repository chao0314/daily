import VNode from "./VNode";
import VElement from "./VElement";
import {assert, getDom} from "./utils";
import {domParser} from "./parser";
import {createVDomTree} from "./createVDomTree";
import proxy from "./proxy";
import directives from "./directives";

export default class VComponent {
    constructor(option) {
        assert(option);
        this.$el = getDom(option.el);
        this.$$directives = {...directives, ...option.directives ? option.directives : {}};
        //解析真实dom树的信息
        let domInformation = domParser(this.$el);
        //根据真实dom树的信息构建虚拟dom
        this.$root = createVDomTree(domInformation, this);
        //todo temporary
        this.$staic = {$event: null, ...option.methods};
        this.$data = proxy(option.data, this.$staic, () => {
            this.render();
        });

        this.render()
    }

    render() {
        this.$root.render();

    }
}