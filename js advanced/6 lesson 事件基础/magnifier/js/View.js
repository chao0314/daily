function assert(exp, msg) {
    if (!exp) throw new Error(msg || "assert error");
}

function getEl(el) {
    if (el instanceof HTMLUnknownElement) return el;
    if (/^string$/.test(typeof el)) {
        el = document.querySelector(el);
        assert(el instanceof HTMLElement);
        return el;
    } else {
        assert(false);
    }
}


class Component {
    constructor(options) {
        assert(new.target !== Component, "abstract class");
        let {el, data} = options;
        data = data || {};
        this._dom = getEl(el);
        this._timer = 0;
        this._init = true;
        let that = this;
        this._data = new Proxy(data, {
            get(target, p) {
                return Reflect.get(target, p);
            },
            set(target, p, value) {
                Reflect.set(target, p, value);
                that.update(target, p, value);
                return true;

            }
        });
        return this._data;
    }

    update() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.render();
        }, 0);

        this.render();

    }

    render() {
        assert(false, "abstract function");
    }


}

class Magnifier extends Component {
    constructor(args) {
        super(args);
        this.update();
    }

    render() {
        if (this._init) {
            let oDom = document.createElement("div");
            oDom.innerHTML = `
            <div class="magnifier">
              <div class="normal">
                 <img src=${this._data.img} alt="">
                 <div class="mask"></div>
                 <div class="cover"></div>
              </div>
              <div class="show">
                 <img src=${this._data.img} alt="">
              </div>
           </div>`;
            this._onMagnifierHandler(oDom);
            this._dom.parentElement.replaceChild(oDom, this._dom);
            this._dom = oDom;
            this._init = false;
        } else {
            this._dom.querySelectorAll("img").forEach(img => {
                img.src = this._data.img;
            });
        }

    }

    _onMagnifierHandler(dom) {
        let oMask = dom.querySelector(".mask");
        let oShow = dom.querySelector(".show");
        let oNormal = dom.querySelector(".normal");
        let oShowImg = dom.querySelector(".show img");
        let disX;
        let disY;
        oNormal.addEventListener("mouseover", function (e) {

            oMask.style.display = "block";
            oShow.style.display = "block";
            disX = oMask.offsetWidth / 2;
            disY = oMask.offsetHeight / 2;
            oMask.style.left = e.clientX - disX + "px";
            oMask.style.top = e.clientY - disY + "px";

        });
        oNormal.addEventListener("mousemove", function (e) {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            let nWidth = oNormal.offsetWidth;
            let nHeight = oNormal.offsetHeight;
            let mWidth = oMask.offsetWidth;
            let mHeight = oMask.offsetHeight;

            if (left < 0) left = 0;
            if (left > nWidth - mWidth) left = nWidth - mWidth;
            if (top < 0) top = 0;
            if (top > nHeight - mHeight) top = nHeight - mHeight;
            oMask.style.left = left + "px";
            oMask.style.top = top + "px";

            oShow.style.display = "block";
            oShowImg.style.left = -left / (nWidth - mWidth) * (oShowImg.offsetWidth - oShow.offsetWidth) + "px";
            oShowImg.style.top = -top / (nHeight - mHeight) * (oShowImg.offsetHeight - oShow.offsetHeight) + "px";

        });
        oNormal.addEventListener("mouseout", function (e) {
            oMask.style.display = "none";
            oShow.style.display = "none";

        })


    }


}

class List extends Component {
    constructor(args) {
        super(args);
        this.update();
    }

    render() {
        assert(Array.isArray(this._data.lis));
        let oDom = document.createElement("ul");
        oDom.className = "list";
        let lis = this._data.lis.reduce((acc, src) => {
            acc.push(`<li><img src=${src} alt=""></li>`);
            return acc;
        }, []);
        oDom.innerHTML = lis.join("");
        this._dom.parentElement.replaceChild(oDom, this._dom);
        this._dom = oDom;
        this._init = false;
    }
}

class View extends Component {
    constructor(options) {
        super(options);
        assert(options.el);
        this._el = getEl(options.el);
        this._components = options.components;
        console.log("com",this._components)
        this._dataMap = new Map();
        this.update();
    }

    update(target, p, value) {
        super.update();
        console.log(p,value)
    }

    render() {
        this._initChild(this._el, this._components);
    }

    _initChild(dom, components) {
        let comps = Object.keys(components).reduce((acc, v) => {
            acc[v.toUpperCase()] = components[v];
            return acc;
        }, {});
        Array.from(dom.children).forEach(child => {
            if (child instanceof HTMLUnknownElement) {
                let comp = comps[child.tagName];
                let options;
                if (comp) {
                    let data = child.getAttribute("data");
                    if (data) {
                        assert(this._data[data], `${data} not exist`);
                        options = {el: child, data: this._data[data]};
                    } else {
                        options = {el: child};
                    }
                    if (this._dataMap.has(data)) {
                        this._dataMap.get(data).push(new comp(options))
                    } else {
                        this._dataMap.set(data, [new comp(options)]);
                    }

                } else {
                    assert(false, "unknown component");
                }

            }
        })
    }


}