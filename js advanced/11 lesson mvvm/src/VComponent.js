import VNode from "./VNode";
import VElement from "./VElement";
import {assert, getDom} from "./utils";
import {domParser} from "./parser";
import {createVDomTree} from "./createVDomTree";
import proxy from "./proxy";
import directives from "./directives";

const uuid = require("uuid/v4");

export default class VComponent {
    constructor(option, parent, root,) {
        assert(option);
        this.$el = getDom(option.el);
        this.$parentCmp = parent;
        this.$rootCmp = root;
        this.$name = uuid();
        this.$$directives = {...directives, ...option.directives ? option.directives : {}};
        //解析真实dom树的信息
        let domInformation = domParser(this.$el);

        //todo temporary
        this.$staic = {$event: null, ...option.methods};
        this.$data = proxy(option.data, this.$staic, () => {
            this.render();
        });
        //根据真实dom树的信息构建虚拟dom
        this.$domTree = createVDomTree(domInformation, this, this.$rootCmp || this);

        this.render()
    }

    render() {
        this.$domTree.render();
        console.log("render******vcomp",this.$name);

    }
}