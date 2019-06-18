function assert(exp, msg) {
    if (!exp) throw new Error(msg || "assert error");
}

class View {

}

class Component {
    constructor(options) {
        assert(new.target !== Component, "abstract class");
        let {dom, data = {}} = options;
        assert(dom instanceof HTMLElement);
        assert(data instanceof Object);
        this._dom = dom;
        this._parent = dom.parentElement;
        this._timer = 0;
        let that = this;
        this._data = new Proxy(data, {
            get(target, p) {
                return Reflect(target, p);
            },
            set(target, p, value) {
                Reflect(target, p, value);
                that.update();
                return true;

            }
        })
    }

    update() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.render();
        }, 0);

        this._mounted(this.render());

    }

    render() {
        assert(false, "abstract function");
    }

    _mounted(ele) {
        assert(ele instanceof HTMLElement);
        this._parent.replaceChild(ele, this._dom);
        this._dom = ele;
    }


}

class Magnifier extends Component {
    constructor(args) {
        super(args);
    }

    render(){

    }


}
