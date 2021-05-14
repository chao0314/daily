class ProxyClass {
    constructor() {
        assert(new.target !== ProxyClass, "ProxyClass can not be instantiated");
        return new Proxy(this, {
            set(target, p, value) {
                Reflect.set(target, p, value);
                if (p.indexOf("_") !== 0) {
                    target.render();
                }
                return true;
            },
            get(target, p) {
                return Reflect.get(target, p);
            }
        })
    }

    render() {
        assert(false, "render is abstract function");
    }
}