import {assert} from "./utils";
import VElement from "./VElement";
import VComponent from "./VComponent";
import VText from "./VText";
import Vue from "./vue"

let vue;

export function createVDomTree(option, parent, context) {
    assert(option);
    if (vue === void 0 && context instanceof Vue) vue = context;
    //console.log("vue", vue);
    if (/^element$/.test(option.type)) {
        //todo context always is vue
        if (option.isHtmlEle) {
            parent = new VElement(option, parent, context);
            parent.$children = option.children.map(child => createVDomTree(child, parent, context));
        } else {
            context = parent = new VComponent(option, context, vue);
        }
    } else if (/^text$/.test(option.type)) {
        parent = new VText(option, parent, context);
    } else {
        assert(false, "unknown type");
    }
    return parent;

}