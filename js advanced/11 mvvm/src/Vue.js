import VComponent from "./VComponent";
import {assert} from "./utils";

export default class Vue extends VComponent {
    constructor(option) {
        let data = option.data;
        option.data = function () {
            return data;
        };
        super(option);
        this.$store.context = this;
        this.$router.context = this;
        return this.$data;
    }

}
Vue.component = function (name, option) {
    if (!this.$components) this.$components = {};
    this.$components[name] = option;
};

Vue.extend = function (componentInfo, parent, root) {
    assert(componentInfo.template);
    let oDiv = document.createElement("div");
    oDiv.innerHTML = componentInfo.template;
    assert(oDiv.children.length === 1);
    componentInfo.el = oDiv.children[0];

    return new VComponent(componentInfo, parent, root);

};