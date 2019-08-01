import proxy from "./proxy";

const uuid = require("uuid/v4");
import {domParser} from "./parser";
import directives from "./directives";
import EventQueue from "./EventQueue";
import {assert, getDom} from "./utils";
import {createVDomTree} from "./createVDomTree";

export default class VComponent extends EventQueue {
    constructor(option, parent, root,) {
        assert(option);
        super();
        this.$refs = {};
        this.$name = uuid();
        this.$timeId = null;
        this.$watchQueue = [];
        this.$el = getDom(option.el);
        this.$parentCmp = parent || {};
        this.$rootCmp = root || this;
        this.created = option.created;
        this.mounted = option.mounted;
        this.updated = option.updated;
        this.$props = option.props || [];
        this.$watch = option.watch || {};
        this.$filters = option.filters || {};
        this.$computed = option.computed || {};
        this.$components = option.components || {};
        // todo global directives
        this.$$directives = {...directives, ...option.directives ? option.directives : {}};
        if (root === void 0 && option.store) this.$store = option.store;
        if (root === void 0 && option.router) this.$router = option.router;

        this.$static = {
            $event: null,
            $on: this.$on.bind(this),
            $off: this.$off.bind(this),
            $emit: this.$emit.bind(this),
            $store: this.$rootCmp.$store,
            $router: this.$rootCmp.$router,
            ...option.methods
        };
        if (option.tag === "router-link") this.$static.to = option.attrs.to;
        if (this.$static.$router) this.$static.$route = this.$rootCmp.$router;

        //todo props may be object,only handle array situation
        if (Array.isArray(this.$props)) {
            this.$props.forEach(prop => {
                this.$static[prop] = this.$parentCmp.$data[prop];
            })
        }

        this.$data = proxy((option.data && option.data()) || {}, this.$static, (path, oldVelue, newValue) => {
            this.handleWatchs(path, oldVelue, newValue);
            this.render();
        });

        this.created && this.created.call(this.$data);

        //解析真实dom树的信息
        let domInformation = domParser(this.$el);

        //根据真实dom树的信息构建虚拟dom
        this.$vdomTree = createVDomTree(domInformation, this, this.$rootCmp || this);

        this.handleComputed();
        this.render();
        this.mounted && this.mounted.call(this.$data);
        //todo check other prop in return
    }

    render() {
        clearTimeout(this.$timeId);
        this.$timeId = setTimeout(() => {
            this.handleComputed();
            this.$vdomTree.render();
            this.$watchQueue.forEach(watch => {
                let {handler, oldValue, newValue} = watch;
                handler.call(this.$data, oldValue, newValue);
            });
            this.$watchQueue.length = 0;
            this.updated && this.updated.call(this.$data);
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
                this.$static[prop] = this.$computed[prop].call(this.$data);
            }
        }

    }

}