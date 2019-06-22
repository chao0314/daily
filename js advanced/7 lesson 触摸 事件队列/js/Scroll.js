(function (global) {

    function getElement(el) {
        if (el instanceof HTMLElement) return el;
        if (/string/.test(typeof el)) {
            el = document.querySelector(el);
            assert(el instanceof HTMLElement);
            return el;
        }
        assert(false, "el invalid");
    }

    const def = {
        x: false,
        y: true,
        factor: 0.3
    };

    class Scroll extends Queue {
        constructor(el, options) {
            assert(el);
            super();
            this._root = getElement(el);
            this._el = this._root.children[0];
            assert(this._el instanceof HTMLElement);
            this.options = Object.assign({}, def, options);
            this.position = {x: 0, y: 0};
            // this._startPosition = {x: 0, y: 0};
            this._startX = 0;
            this._startY = 0;
            this._initEvents();
        }

        _touchstart(e) {
            e.cancelBubble = true;
            e.stopPropagation();
            this._startX = e.targetTouches[0].clientX;
            this._startY = e.targetTouches[0].clientY;
            console.log("touch start", this._startX, this._startY);
            this._start();


        }

        _start() {

            this.emit("start", this.position);
        }

        _touchmove(e) {
            e.cancelBubble = true;
            e.stopPropagation();
            //let {x, y} = this._startPosition;
            let {x, y} = this.position;
            let clientX = e.targetTouches[0].clientX;
            let clientY = e.targetTouches[0].clientY;
            this.position.x = x + clientX - this._startX;
            this.position.y = y + clientY - this._startY;
            this._startX = clientX;
            this._startY = clientY;

            this._move();
        }

        _move() {
            let {x, y, factor} = this.position;
            let {x: h, y: v} = this.options;
            const outWidth = this._root.offsetWidth;
            const outHeight = this._root.offsetHeight;
            const innerWidth = this._el.offsetWidth;
            const innerHeight = this._el.offsetHeight;
            let transform, maxX, maxY;

            if (outWidth > innerWidth) {
                maxX = outWidth - innerWidth;
            } else {
                maxX = 0;

            }

            if (outHeight > innerHeight) {
                maxY = outHeight - innerHeight;
            } else {
                maxY = 0;
            }
            if (x > 0) x *= factor;
            if (x < -maxX) x = -maxX + (maxX + x) * factor;


            if (h && v) {
                transform = `translate(${x}px,${y}px)`;
            } else if (h) {
                transform = `translateX(${x}px)`;
            } else if (v) {
                transform = `translateY(${y}px)`;
            }
            console.log(x, y, transform);

            this._el.style.transform = transform;

            this.emit("move", this.position)
        }

        _touchend(e) {
            e.cancelBubble = true;
            e.stopPropagation();
            // this._startPosition = {...this.position};
            this._end();
        }

        _end() {

            this.emit("end", this.position);
        }

        _initEvents() {

            this._el.addEventListener("touchstart", this._touchstart.bind(this), false);
            this._el.addEventListener("touchmove", this._touchmove.bind(this), false);
            this._el.addEventListener("touchend", this._touchend.bind(this), false);
        }

        destroy() {
            this._el.removeEventListener("touchstart", this._touchstart);
            this._el.removeEventListener("touchmove", this._touchmove);
            this._el.removeEventListener("touchend", this._touchend);
        }

    }

    global.Scroll = Scroll;
})(window);