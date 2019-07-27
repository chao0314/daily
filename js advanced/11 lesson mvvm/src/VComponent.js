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
        this.$timeId = null;
        this.$watch = option.watch || {};
        this.$computed = option.computed || {};
        this.$watchQueue = [];
        this.$$directives = {...directives, ...option.directives ? option.directives : {}};
        //解析真实dom树的信息
        let domInformation = domParser(this.$el);

        //todo temporary
        this.$staic = {$event: null, ...option.methods};
        this.$data = proxy(option.data, this.$staic, (path, oldVelue, newValue) => {
            this.handleWatchs(path, oldVelue, newValue);
            this.render();
        });
        //根据真实dom树的信息构建虚拟dom
        this.$domTree = createVDomTree(domInformation, this, this.$rootCmp || this);
        this.handleComputed();
        this.render();
        //todo check other prop in return
    }

    render() {
        clearTimeout(this.$timeId);
        this.$timeId = setTimeout(() => {
            this.handleComputed();
            this.$domTree.render();
            this.$watchQueue.forEach(watch => {
                let {handler, oldValue, newValue} = watch;
                handler.call(this.$data, oldValue, newValue);
            });
            this.$watchQueue.length = 0;
            console.log("render******vcomp", this.$name);
        }, 0);

    }

    handleWatchs(path, oldValue, newValue) {
        path = path.join(".");
        let reg = new RegExp(`\^${path}`);
        let allReg = new RegExp(`\^${path}\$`);
        for (let prop in this.$watch) {
            if (this.$watch.hasOwnProperty(prop) && reg.test(prop)) {
                let watch = this.$watch[prop];
                if (watch instanceof Function && allReg.test(prop)) this.$watchQueue.push({
                    handler: watch,
                    oldValue,
                    newValue
                });
                else if ((watch instanceof Object)) {
                    if (watch.deep || (!watch.deep && allReg.test(prop))) this.$watchQueue.push({
                        ...watch,
                        oldValue,
                        newValue
                    });
                }
            }

        }
    }

    handleComputed() {
        for (let prop in this.$computed) {
            if (this.$computed.hasOwnProperty(prop)) {
                this.$staic[prop] = this.$computed[prop].call(this.$data);
            }
        }

    }

}