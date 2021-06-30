export function throttle(fn: Function, interval: number) {
    let timer: ReturnType<typeof setTimeout>;

    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn();
            }, interval);

        }

    }

}

export const isScroll = (el: HTMLElement): boolean => {
    const overflowY = getComputedStyle(el).getPropertyValue('overflow-y') || '';
    const reg = /(auto)|(scroll)/ig;
    return reg.test(overflowY);

}


export function getScrollContainer(el: HTMLElement): HTMLElement {

    while (el) {
        if (el === document.documentElement) return el;
        if (isScroll(el)) return el;
        el = el.parentElement;
    }


}

export function getOffsetTop(el: HTMLElement) {

    let offsetTop = 0;

    while (el) {
        offsetTop += el.offsetTop;
        el = el.parentElement;
    }
    return offsetTop;

}


