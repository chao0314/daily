class ImgButton {

    constructor(canvas, options = {}) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.normalImg = options.normal;
        this.downImg = options.down;
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.callbacks = [];
        this.isDown = false;

        this.canvas.addEventListener('mousedown', ev => {

            const x = ev.offsetX;
            const y = ev.offsetY;

            if (this.isPointIn(x, y)) {

                this.isDown = !this.isDown;

                ev.stopPropagation();
                ev.preventDefault();
            }

        });

        this.canvas.addEventListener('mouseup', ev => {

            if (this.isDown) this.callbacks.forEach(cb => cb(ev));
            this.isDown = false;

        })


    }

    drawButton() {
        const img = this.isDown ? this.downImg : this.normalImg;
        this.ctx.drawImage(img, this.x, this.y);
    }

    isPointIn(x = 0, y = 0) {

        this.ctx.beginPath();

        this.ctx.rect(this.x, this.y, this.normalImg.width, this.normalImg.height);

        const isPointIn = this.ctx.isPointInPath(x, y);

        this.ctx.beginPath();

        return isPointIn;

    }

    click(cb) {

        this.callbacks.push(cb);


    }


}