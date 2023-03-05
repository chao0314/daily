export const observerOption = {

    createElement(tag) {

        return document.createElement(tag);

    },
    setElementText(el, text) {

        el.textContent = text;

    },
    insert(el, parent, anchor = null) {

        parent.insertBefore(el, anchor);

    },
    remove(el, parent) {

        if (!parent) {
            parent = el.parent;
        }

        parent.removeChild(el);
    },
    patchProp(el, key, oldValue, newValue) {

        if (oldValue === newValue) return;




        if (key === 'class') el.className = newValue;

        if (shouldSetAsPros(el, key)) {

            // disabled
            if (typeof el[key] === 'boolean' && newValue === '') el[key] = true;
            else el[key] = newValue;

        } else {

            el.setAttribute(key, newValue);
        }


    },


}


function shouldSetAsPros(el, key) {

    if (el.tagName.toLowerCase() === 'input' && key.toLowerCase() === 'form') return false;

    return key in el;

}