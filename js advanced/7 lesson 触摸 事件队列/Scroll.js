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
        factor: 0.3,
        animationTime: 0.15,
        animationType: "ease"

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
            this.maxX = 0;
            this.maxY = 0;
            this._initEvents();
        }

        _touchstart(e) {
            e.cancelBubble = true;
            e.stopPropagation();
            this._startX = e.targetTouches[0].clientX;
            this._startY = e.targetTouches[0].clientY;
            // console.log("touch start", this._startX, this._startY);
            this._start();

        }

        _start() {
            const outWidth = this._root.offsetWidth;
            const outHeight = this._root.offsetHeight;
            const innerWidth = this._el.offsetWidth;
            const innerHeight = this._el.offsetHeight;
            if (innerWidth > outWidth) {
                this.maxX = innerWidth - outWidth;
            } else {
                this.maxX = 0;
            }
            if (innerHeight > outHeight) {
                this.maxY = innerHeight - outHeight;
            } else {
                this.maxY = 0;
            }
            this._el.style.transition = '';
            console.log("touch start", this._startX, this._startY);
            this.emit("start", this.position);


        }



        _touchmove(e) {
            e.cancelBubble = true;
            e.stopPropagation();
            //let {x, y} = this._startPosition;
            let {x, y} = this.position;
            let {factor} = this.options;
            let clientX = e.targetTouches[0].clientX;
            let clientY = e.targetTouches[0].clientY;
            let disX = clientX - this._startX;
            let disY = clientY - this._startY;
            if (x > 0 || x < -this.maxX) disX *= factor;
            //if () x = -this.maxX + (this.maxX + x) * factor;
            if (y > 0 || y < -this.maxY) disY *= factor;
            //if () y = -this.maxY + (this.maxY + y) * factor;
            x += disX;
            y += disY;
            this.position = {x, y};
            this._startX = clientX;
            this._startY = clientY;
            this._move();
        }

        _move() {

            this.emit("move", this.position);
            this._transform();
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
            console.log("touch end");
            this.emit("end", this.position);
            let {x, y} = this.position;
            if (x > 0) x = 0;
            if (x < -this.maxX) x = -this.maxX;
            if (y > 0) y = 0;
            if (y < -this.maxY) y = -this.maxY;
            this.position = {x, y};
            this._transform();

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



        _transform() {
            let transform;
            let {x: h, y: v} = this.options;
            let {x, y} = this.position;
            if (h && v) {
                transform = `translate(${x}px,${y}px)`;
            } else if (h) {
                transform = `translateX(${x}px)`;
            } else if (v) {
                transform = `translateY(${y}px)`;
            }
            // console.log(x, y, transform);
            let {animationTime: time, animationType: type} = this.options;
            this._el.style.transition = `transform ${time}s ${type}`;
            this._el.style.transform = transform;

        }


    }

    global.Scroll = Scroll;
})(window);