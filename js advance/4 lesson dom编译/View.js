function assert(exp, msg) {
    if (!exp) throw new Error(msg);
}

class View {

    constructor(options) {
        this._root = View._getRoot(options.el);
        this._template = this._root.cloneNode(true);
        this._data = View._getData(options.data);
        this._methods = View._getMethods(options.methods || {});
        this._parent = this._root.parentElement;
        this._timer = 0;
        const that = this;
        this.update();
        return new Proxy(this._data, {
            set(target, p, value, receiver) {
                Reflect.set(target, p, value);
                that.update();
                return true;
            },
            get(target, p, receiver) {
                assert(target[p], "invalid property");
                return Reflect.get(target, p);
            }
        })

    }

    update() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this._render();
        }, 0)

    }

    _render() {
        console.log("render");
        // dom render
        let root = this._template.cloneNode(true);
        let aStr = [];
        for (let prop in this._data) {
            if (this._data.hasOwnProperty(prop)) {
                aStr.push(`let ${prop} = ${JSON.stringify(this._data[prop])};`);
            }
        }
        Array.from(root.childNodes).forEach(node => {
            if (node.nodeType === document.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(/{{[^}]+}}/, match => {
                    return eval(aStr.join("").concat(match.slice(2, match.length - 2)));
                })
            }
        });

        this._parent.replaceChild(root, this._root);
        this._root = root;


    }

    static _getData(data) {
        assert(data && data instanceof Function);
        return data();
    }

    static _getRoot(el) {
        assert(el);
        if (typeof el === 'string') {
            let oEl = document.querySelector(el);
            assert(oEl && oEl instanceof HTMLElement);
            return oEl;
        } else if (el instanceof HTMLElement) {
            return el;
        } else {
            assert(false, "el invalid");
        }

    }

    static _getMethods(methods) {
        assert(methods instanceof Object)
    }

}