import {assert} from "./utils";
import {exp} from "./expression";
import VNode from "./VNode";

export default {
    bind(vdom, directive) {
        assert(vdom instanceof VNode && directive.arg);
        let {arg} = directive;
        let result = exp(arg, vdom.$root.$data);
        vdom.$el.setAttribute(arg, result);
    }


}