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

type  Position = { index: number, top: number, bottom: number };

export function binSearchPositionIndex(positions: Position[], offset: number) {

    //可能在某个元素的部分显示
    let start = 0;
    let end = positions.length - 1;
    const {top: diff} = positions[0];

    while (start < end) {

        let middle = Math.floor((end + start) / 2);

        const {top, bottom, index} = positions[middle];

        const offsetTop = top - diff;
        const offsetBottom = bottom - diff;


        if (offset === offsetTop || offset === offsetBottom || (offset > offsetTop && offset < offsetBottom)) return index;

        if (offset < offsetTop) {

            end = middle - 1;

        }
        if (offset > offsetBottom) {

            start = middle + 1;
        }


    }

    if (start === end) {

        const {top, bottom, index} = positions[start];
        const offsetTop = top - diff;
        const offsetBottom = bottom - diff;
        if (offset === offsetTop || offset === offsetBottom || (offset > offsetTop && offset < offsetBottom)) return index;

    }
    return -1;


}
