import {assert} from "./utils";

export function domParser(dom) {
    assert(dom instanceof Node, "invalid parameter");
    if (dom.nodeType === document.ELEMENT_NODE) {
        let tag = dom.tagName.toLowerCase();
        //x-xxx 有中线的自定义组件，会被识别为 HTMLElement
        //todo bug em strong and so on also  is  HTMLElement
        //console.log(dom.constructor);
        let isHtmlEle = dom.constructor !== HTMLElement && dom.constructor !== HTMLUnknownElement;
        let attrs = {};
        let children = [];
        if (dom.hasAttributes()) {
            Array.from(dom.attributes).forEach(v => {
                attrs[v.name] = v.value;
            })
        }

        if (dom.childNodes.length > 0) {
            children = Array.from(dom.childNodes).map(child => domParser(child)).filter(child => child);
        }

        return {
            tag,
            attrs,
            isHtmlEle,
            children,
            el: dom,
            type: "element",
            _virtual: true
        }


    } else if (dom.nodeType === document.TEXT_NODE) {
        let value = dom.nodeValue.trim();
        if (value) return {
            value,
            el: dom,
            type: "text",
            _virtual: true
        }
    }

}

// v-xxx v-xxx=xxx  v-bind:xxx=xxx v-on:xxx = xxx  :xxx = xxx @xxx = xxx

export function directiveParser(attrs) {
    assert(typeof attrs === "object");
    let dirs = [];
    for (let key in attrs) {
        if (attrs.hasOwnProperty(key)) {
            let dir;
            let [name, arg] = key.split(":");
            if (/^v-/i.test(key)) {
                dir = {
                    name: name.slice(2),
                    arg
                }
            } else if (/^\:/.test(key)) {
                dir = {
                    name: "bind",
                    arg: key.slice(1)
                }
            } else if (/^@/.test(key)) {
                dir = {
                    name: "on",
                    arg: key.slice(1)
                }
            }

            if (dir) {
                assert(dir.name !== "bind" || (dir.name === "bind" && dir.arg));
                assert(dir.name !== "on" || (dir.name === "on" && dir.arg));
                dir.value = attrs[key];
                if (/(for)|(bind)/.test(dir.name)) dir.meta = {};
                if (/mode/.test(dir.name)) {
                    dirs.push({
                        name: "bind",
                        arg: "value",
                        meta: {},
                        value: dir.value
                    });
                    dirs.push({
                        name: "on",
                        arg: "input",
                        value: `${dir.value} = $event.target.value`
                    })
                } else dirs.push(dir);
            }
        }
    }
    return dirs;
}

export function listenerParser(dirs) {
    assert(Array.isArray(dirs));
    return dirs.filter(dir => dir.name === "on");
}

//v-for = (item,index) in arr
export function forParser(exp) {
    assert(typeof exp === "string");
    let [temp, iterator] = exp.split(" in ");
    temp = temp.replace(/[()]/g, "");
    let [item, index] = temp.split(",");
    return {
        iterator: iterator.trim(),
        item: item.trim(),
        index: index ? index.trim() : "index"
    }
}