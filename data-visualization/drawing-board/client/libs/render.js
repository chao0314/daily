function render() {
    gd.clearRect(0, 0, W, H);

    gd.fillStyle = '#FFF';
    gd.fillRect(0, 0, W, H);

    globalPaths.forEach(path => {
        const {type, color, data} = path;

        gd.beginPath();
        toolDatas[type].draw(data);

        gd.strokeStyle = color;
        gd.stroke();
    });
}

let myKeys = [];

function undo() {
    if (myKeys.length > 0) {
        socket.emit('removePath', myKeys.pop());
    }
}

let drawingKey;

function startDraw(type, builder) {
    canvas.onmousedown = function (ev) {
        let {x: startX, y: startY} = pos(ev);
        let data = builder.onStart(startX, startY);
        let lastTime = Date.now();

        ev.preventDefault();

        let key = Math.random();
        myKeys.push(key);

        drawingKey = key;

        function createPath(data) {
            return {
                type,
                key,
                color: colorDatas[curColor].color,
                data,
            };
        }

        document.onmousemove = function (ev) {
            let {x, y} = pos(ev);

            //渲染其他图形
            render();

            //当前图形
            gd.beginPath();
            data = builder.onMove(data, x, y, startX, startY);
            builder.draw(data);


            if (Date.now() - lastTime >= 10) {
                socket.emit('removePath', key);
                socket.emit('addPath', createPath(data));

                lastTime = Date.now();
            }

            gd.strokeStyle = colorDatas[curColor].color;
            gd.stroke();

            //阻止
            ev.preventDefault();
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            drawingKey = null;

            socket.emit('removePath', key);
            socket.emit('addPath', createPath(data));
        };
    };
}

