import {isNo} from "@vue/shared";

export function patchClass(el, className) {
    if (isNo(className)) className = '';
    el.className = className;
}