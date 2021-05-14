class Component {
    constructor() {
        assert(new.target !== Component, "Component is abstract class");
        this.name = new.target.name;
    }

    render() {
        assert(false, "render is abstract function")
    }

    getEl(tag) {
        return document.createElement(tag)
    }
}

class CompDiv extends Component {


    render() {
        let oDiv = this.getEl("div");
        oDiv.innerHTML = "comp div";
        return oDiv;
    }

}

class CompDialog extends Component {
    render() {
        let oDiv = this.getEl("div")
        //
        oDiv.innerHTML = "comp dialog";
        // oDiv.style.position = "fixed";
        // oDiv.style.width = "200px";
        // oDiv.style.height = "200px";
        // oDiv.style.background = "silver";
        // oDiv.style.left = "50%";
        // oDiv.style.top = "50%";
        // oDiv.style.transform = "translate(-50%,-50%)";
        oDiv.style.cssText = "position:fixed; width:200px;height:200px;background:silver;left:50%;right:50%;transform:translate(-50%,-50%)";
        return oDiv;
    }
}

class View {
    _root;

    constructor(options) {
        const {root, components, methods} = options;
        if (typeof root === "string") {
            this._root = document.querySelector(root);
            assert(this._root, "root selector invalid");
        } else if (root instanceof HTMLElement) {
            this._root = root;
        } else {
            throw new Error("root invalid");
        }
        this._create(components, methods);
    }

    _create(components, methods) {
        let keys = Object.keys(components);
        if (!keys.length) return;
        let fragment = new DocumentFragment();
        let compMap = new Map();
        keys.forEach(key => {
            compMap.set(key.toUpperCase(), components[key]);
        });
        let elements = Array.from(document.getElementsByTagName("*"));
        elements.forEach(el => {
            if (el.constructor === HTMLUnknownElement) {
                // console.log(el.getAttributeNames());
                // console.log(el.attributes);
                if (compMap.has(el.tagName)) {
                    let compDom = (new (compMap.get(el.tagName))).render();
                    fragment.append(compDom);
                    if (el.hasAttributes()) {
                        let attrs = el.attributes;
                        let attrMap = new Map();
                        for (let i = 0; i < attrs.length; i++) {
                            attrMap.set(attrs[i].name, attrs[i].value);
                        }
                        this._onEvents(compDom, attrMap, methods);
                    }

                } else {
                    throw new Error(`please register component ${el.tagName}`);
                }

            }
        });
        this._root.parentElement.appendChild(fragment);
    }

    _onEvents(dom, attrMap, methods) {
        attrMap.forEach((v, k) => {
            if (/^@/.test(k)) {
                k = k.slice(1);
                if (methods[v]) {
                    dom.addEventListener(k, methods[v]);
                } else {
                    throw new Error(`not found ${k} event handler function`);
                }
            }

        })


    }

}