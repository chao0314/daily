import {getDom, assert} from "./utils";
import {domParser} from "./parser";
import proxy from "./proxy";
import {createVDomTree} from "./createVDomTree";

export default class Vue {
    constructor(option) {
        assert(option);
        this.$el = getDom(option.el);
        //解析真实dom树的信息
        let domInformation = domParser(this.$el);
        //根据真实dom树的信息构建虚拟dom
        this.$root = createVDomTree(domInformation, this);
        console.log(this.$root)
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