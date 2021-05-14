export const insert = (newNode, parent, anchor = null) => parent.insertBefore(newNode, anchor);
export const remove = node => {
    const parent = node.parentElement;
    if (parent) parent.removeChild(node);
}
export const createElement = tag => document.createElement(tag);
export const createTextNode = text => document.createTextNode(text || '');
export const setElementText = (el, text) => el.textContent = text;
export const setTextNodeValue = (node, text) => node.nodeValue = text;
export const querySelector = selector => document.querySelector(selector);





