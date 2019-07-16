import {assert} from "./utils";
import VElement from "./VElement";
import VComponent from "./VComponent";
import VText from "./VText";


export function createVDomTree(option, context) {
    assert(option);
    let root;
    if (/^element$/.test(option.type)) {
        if (option.isHtmlEle) {
            root = new VElement(option, context);
        } else {
            root = new VComponent(option, context);
        }
        root.$children = option.children.map(child => createVDomTree(child, context));
    } else if (/^text$/.test(option.type)) {
        root = new VText(option, context);
    } else {
        assert(false, "unknown type");
    }
    return root;

}