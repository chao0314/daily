export function createVElement(vm, tagName, data, ...children) {

    return createVNode(vm, tagName, data, children);

}

export function createVText(vm, text) {

    return createVNode(vm, null, null, null, text);

}


function createVNode(vm, tagName, data, children, text, key, el) {

    return {vm, tagName, data, children, text, key, el};

}