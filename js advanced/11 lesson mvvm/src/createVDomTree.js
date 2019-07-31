import {assert} from "./utils";
import VElement from "./VElement";
import VComponent from "./VComponent";
import VText from "./VText";
import Vue from "./Vue"

let vue;
let routerView;

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
            //todo component is ....
            let name = option.tag;
            if (name === "component") {
                assert(option.attrs.is, `must have 'is' attribute`);
                name = option.attrs.is;
            }

            let componentInfo = context.$components[name] || Vue.$components[name];
            assert(componentInfo, `${name} component no register`);
            componentInfo.attrs = option.attrs;
            componentInfo.tag = option.tag;
            context = parent = createComponent(option, componentInfo, context, vue);

        }
    } else if (/^text$/.test(option.type)) {
        parent = new VText(option, parent, context);
    } else {
        assert(false, "unknown type");
    }
    return parent;

}

export function createComponent(domInfo, componentInfo, parent, root) {
    let oDiv = document.createElement("div");
    oDiv.innerHTML = componentInfo.template;
    assert(oDiv.children.length === 1);
    let el = oDiv.children[0];
    domInfo.el.parentElement.replaceChild(el, domInfo.el);
    componentInfo.el = el;
    //todo need to pass other parameter of component to root element,for example:event bind and so on
    //todo handle slot first
    let slots = Array.from(componentInfo.el.getElementsByTagName("slot"));
    slots.forEach(slot => {
        let fg = document.createDocumentFragment();
        domInfo.children && domInfo.children.forEach(child => {
            fg.appendChild(child.el.cloneNode(true));
        });
        slot.parentElement.replaceChild(fg, slot);

    });
    return new VComponent(componentInfo, parent, root);
}