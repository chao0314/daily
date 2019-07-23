import {assert} from "./utils";
import VElement from "./VElement";
import VComponent from "./VComponent";
import VText from "./VText";


export function createVDomTree(option, context, parent) {
    assert(option);
    if (/^element$/.test(option.type)) {
        //todo context always is vue
        if (option.isHtmlEle) {
            parent = new VElement(option, context);
        } else {
            parent = new VComponent(option, context);
        }
        parent.$children = option.children.map(child => createVDomTree(child, context, parent));
    } else if (/^text$/.test(option.type)) {
        parent = new VText(option, context, parent);
    } else {
        assert(false, "unknown type");
    }
    return parent;

}