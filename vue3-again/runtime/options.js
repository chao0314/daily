export const observerOption = {

    queryElement(selector) {

        return document.querySelector(selector);
    },
    createElement(tag) {

        return document.createElement(tag);

    },
    createText(text) {

        return document.createTextNode(text);
    },
    setElementText(el, text = '') {

        el.textContent = text;

    },
    setText(textNode, value) {

        textNode.nodeValue = value;

    },

    insert(el, parent, anchor = null) {

        parent.insertBefore(el, anchor);

    },
    remove(el, parent) {

        if (!parent) {
            parent = el.parentElement;
        }

        parent && parent.removeChild(el);
    },
    patchProp(el, key, oldValue, newValue) {

        if (oldValue === newValue) return;

        if (key.startsWith('on')) {

            const eventName = key.slice(2).toLowerCase();

            const invokers = el._invokers || (el._invokers = {});

            let invoker = invokers[eventName];

            if (newValue) {

                if (!invoker) {

                    invoker = invokers[eventName] = function (e) {

                        const handlers = invoker.value;
                        // 在事件发生后 才绑定的 事件处理函数 不需要调用
                        // 冒泡事件 和 js 执行 穿插执行，互不影响，所以有可能发生
                        if (!handlers || e.timeStamp < invoker.attachedTime) return;

                        if (Array.isArray(handlers)) {

                            for (let i = 0; i < handlers.length; i++) {
                                handlers[i](e);
                            }

                        } else {
                            handlers(e);
                        }
                    }

                    el.addEventListener(eventName, invoker);
                    invoker.attachedTime = performance.now();

                }

                invoker.value = newValue


            } else {

                el.removeEventListener(eventName, invoker);
            }
            // class style 需要单独特异化处理，此处简单示意，todo...
        } else if (key === 'class') el.className = newValue;

        else if (shouldSetAsPros(el, key)) {

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