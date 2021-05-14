import {isNo} from "@vue/shared";

export function patchAttribute(el, key, value) {
    if (isNo(value)) el.removeAttribute(key);
    else el.setAttribute(key, value);

}