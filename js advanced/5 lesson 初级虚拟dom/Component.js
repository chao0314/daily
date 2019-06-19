class Component extends VElement {
    _data;
    _methods;
    constructor(options) {
        assert(options && options.el);
        super(getEl(options.el));
        this._methods = options.methods || {};
        let that = this;
        this._data = new Proxy( options.data()||{},{
            get(target, p, receiver) {
                assert(target[p],`invalid property ${p}`);
                return Reflect(target,p);
            },
            set(target, p, value, receiver) {
                Reflect.set(target,p,value);
                that.render();
                return true;
            }
        });
        this.render();
    }

    render() {
        console.log("component render",this);
        this._children.forEach(child=>{
            child.render();
        })

    }
}

function getEl(el) {
    if (/^string$/.test(typeof el)) {
        el = document.querySelector(el);
        assert(el instanceof HTMLElement);
        return el;
    } else if (el instanceof HTMLElement) {
        return el
    } else {
        assert(false, "el invalid");
    }
}