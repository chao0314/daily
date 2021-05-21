import {isNo} from "@vue/shared";

export function patchStyle(el, oldStyleObj, newStyleObj) {
    if (isNo(newStyleObj)) return el.removeAttribute('style');
    Object.entries(newStyleObj).forEach(([key, value]) => el.style[key] = value);
    !isNo(oldStyleObj) && Object.keys(oldStyleObj).forEach(key => {
        if (isNo(newStyleObj[key])) el.style[key] = '';
    })
}