import {getDom, assert} from "./utils";
import {domParser} from "./parser";
import proxy from "./proxy";
import {createVDomTree} from "./createVDomTree";
import VComponent from "./VComponent"

export default class Vue extends VComponent {
    constructor(option) {
        let data = option.data;
        option.data = function () {
            return data;
        };
        super(option);
        this.$store.context = this;
        return this.$data;
    }

}
Vue.component = function (name, option) {
    if (!this.$components) this.$components = {};
    this.$components[name] = option;
};