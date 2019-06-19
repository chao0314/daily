class VElement extends VNode {
    _children;
    _attributes;
    _directives;
    _listeners;
    _context;

    constructor(dom, context) {
        super(dom);
        this._context = context || this;
        this._attributes = getAttributes(dom, this._context);
        this._directives = getDirectives(this._attributes);
        this._listeners = getListeners(this._directives);
        this._children = getChildren(dom, this._context);
    }

    render() {
        console.log("v element render",this)
    }

}

function getChildren(dom, context) {
    let children = [];
    Array.from(dom.childNodes).forEach(child => {
        if (child.nodeType === document.ELEMENT_NODE) {
            children.push(new VElement(child, context));
        } else if (child.nodeType === document.TEXT_NODE && child.nodeValue.trim()) {
            children.push(new VText(child, context));
        }
    });
    return children;

}

function getAttributes(dom) {
    assert(dom instanceof HTMLElement);
    return Array.from(dom.attributes).reduce(function (acc, {name, value}) {
        acc[name] = value;
        return acc;
    }, {})
}

//v-on:xxx = yyy @xxx = yyy v-bind:xxx =yyy :xxx = yyy
function getDirectives(attrs) {
    assert(attrs);
    let dirs = [];
    for (let prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
            // let [name, arg] = prop.split(":");
            if (prop.startsWith("v-")) {
                let [name, arg] = prop.split(":");
                dirs.push({
                    name: name.slice(2),
                    arg,
                    value: attrs[prop]
                })
            } else if (prop.startsWith("@")) {
                dirs.push({
                    name: "on",
                    arg: prop.slice(1),
                    value: attrs[prop]
                })

            } else if (prop.startsWith(":")) {
                dirs.push({
                    name: "bind",
                    arg: prop.slice(1),
                    value: attrs[prop]
                })
            }

        }
    }
    return dirs;

}

function getListeners(dirs) {
    assert(Array.isArray(dirs));
    return dirs.filter(v => /^on$/.test(v.name)).reduce((acc, v) => {
        acc.push({
            event: v.arg,
            listener: v.value
        });
        return acc;
    }, [])


}