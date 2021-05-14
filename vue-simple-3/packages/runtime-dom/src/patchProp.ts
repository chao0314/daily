import {patchClass} from "./patch/patchClass";
import {patchStyle} from "./patch/patchStyle";
import {isOn} from "@vue/shared";
import {patchEvent} from "./patch/patchEvent";
import {patchAttribute} from "./patch/patchAttribute";

export const patchProp = (el, key, oldV, newV) => {

    switch (key) {

        case 'class':
            patchClass(el, newV);
            break;
        case 'style':
            patchStyle(el, oldV, newV);
            break;

        default:
            if (isOn(key)) patchEvent(el, key, newV);
            else patchAttribute(el, key, newV);

    }

}