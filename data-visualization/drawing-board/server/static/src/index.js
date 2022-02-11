class Tool {
    constructor(type) {
        if (new.target === Tool) throw new Error('abstract class');
        this.type = type;
        this.init();
    }

    init() {
        throw new Error('abstract function');
    }

    move() {
        throw new Error('abstract function');
    }

    draw() {

        throw new Error('abstract function');
    }

}

class Line extends Tool {

    constructor() {
        super('line');
    }

    init(x = 0, y = 0) {

        this.data = [{x, y}];
        return this.data;

    }

    move(x, y) {

        this.data.push({x, y});
        return this.data;
    }

    draw(ctx, color, data) {

        data = data || this.data;
        ctx.beginPath();
        data.forEach((v, i) => {
            const {x, y} = v;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        })
        ctx.strokeStyle = color;
        ctx.stroke();

    }
}

class Ellipse extends Tool {
    constructor() {
        super('ellipse');
    }

    init(x = 0, y = 0) {

        this.data = {x, y};
        return this.data;

    }

    move(x, y) {

        this.data.endX = x;
        this.data.endY = y;
        return this.data;
    }

    draw(ctx, color, data) {

        data = data || this.data;
        ctx.beginPath();

        const {x, y, endX, endY} = data;
        const rx = Math.abs(endX - x) / 2;
        const ry = Math.abs(endY - y) / 2;
        const cx = x + (endX - x) / 2;
        const cy = y + (endY - y) / 2;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

        ctx.strokeStyle = color;
        ctx.stroke();

    }


}

class Rect extends Tool {

    constructor() {
        super('rect');
    }

    init(x = 0, y = 0) {

        this.data = {x, y};
        return this.data;

    }

    move(x, y) {

        this.data.endX = x;
        this.data.endY = y;
        return this.data;
    }

    draw(ctx, color, data) {

        data = data || this.data;
        ctx.beginPath();

        const {x, y, endX, endY} = data;
        const w = Math.abs(endX - x);
        const h = Math.abs(endY - y);
        const lx = Math.min(x, endX);
        const ly = Math.min(y, endY);
        ctx.rect(lx, ly, w, h);

        ctx.strokeStyle = color;
        ctx.stroke();

    }


}

class Triangle extends Tool {


    constructor() {
        super('triangle');
    }

    init(x = 0, y = 0) {

        this.data = {x, y};
        return this.data;

    }

    move(x, y) {

        this.data.endX = x;
        this.data.endY = y;
        return this.data;
    }

    draw(ctx, color, data) {

        data = data || this.data;
        ctx.beginPath();

        const {x, y, endX, endY} = data;
        const x2 = endX - (endX - x) * 2;
        const y2 = endY;

        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.stroke();

    }

}


const toolsData = [
    {type: "line", label: "线", value: new Line()},
    {type: "ellipse", label: "椭圆", value: new Ellipse()},
    {type: "rect", label: "矩形", value: new Rect()},
    {type: "triangle", label: "三角", value: new Triangle()},

]

const colorsData = [
    {label: '黑色', value: '#000'},
    {label: '灰色', value: '#666'},
    {label: '浅灰', value: '#ccc'},
    {label: '红色', value: '#F00'},
    {label: '绿色', value: '#0F0'},
    {label: '黄色', value: '#FF0'},
    {label: '蓝色', value: '#00F'},
    {label: '紫色', value: '#F0F'},
];


const throttle = (cb, interval = 100) => {

    let timer = null;

    return function (...args) {

        if (timer) return;
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, interval);

    }

}

//初始化
const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const toolbar = document.getElementById('toolbar');
const colors = document.getElementById('colors');
const undoBtn = document.getElementById('undo');
const saveBtn = document.getElementById('save');

//当前选中
let curTool = null;
let curColor = null;
let globalPaths = [];
let drawingKey = null;
const localKeys = [];

const socket = io.connect();

socket.on('init', ({uid, paths}) => {

    globalPaths = paths;
    //更新
    socket.on('pathupdate', paths => {

        //本地正在画图
        if (drawingKey) {
            globalPaths = paths.filter(path => path.key !== drawingKey);
        } else {
            globalPaths = paths;
            render(globalPaths);
        }

        console.log("update", paths);

    });

})


initTools(toolsData);
initColors(colorsData);
initDrawing(canvas);

undoBtn.onclick = function () {

    if (localKeys.length > 0) socket.emit("removePath", localKeys.pop());
}

saveBtn.onclick = function () {

    canvas.toBlob((blob) => {

        // const  formData =  new FormData();
        // formData.append("draw-bord",blob);
        // upload...todo...

        const link = document.createElement("a");
        link.download = "draw-board.jpeg";
        link.href = URL.createObjectURL(blob);
        link.click();

    }, "image/jpeg");
}
document.onkeydown = function (ev) {
    if (ev.ctrlKey && ev.key === 'z') {
        undo();
    }
};

function initTools(toolsData) {

    toolsData.forEach(({label, value}) => {

        const tool = document.createElement("button");
        tool.setAttribute("type", "button");
        tool.innerHTML = label;
        tool.addEventListener("click", ev => {
            curTool = value;
            console.log(curTool.type);
            Array.from(toolbar.children).forEach(tool => tool.classList.remove("active"));
            tool.classList.add("active");

        })

        toolbar.append(tool);
    })


}

function initColors(colorsData) {

    colorsData.forEach(({label, value}) => {

        const color = document.createElement("button");
        color.setAttribute("type", 'button');
        color.innerHTML = label;
        color.addEventListener('click', ev => {
            curColor = value;
            console.log(curColor);
            Array.from(colors.children).forEach(color => color.classList.remove('active'));
            color.classList.add('active');

        })

        colors.append(color);

    })

}

function initDrawing(canvas) {

    const ctx = canvas.getContext('2d');

    canvas.onmousedown = ev => {

        const x = ev.pageX - canvas.offsetLeft;
        const y = ev.pageY - canvas.offsetTop;

        curTool.init(x, y);

        const {type, data} = curTool;
        drawingKey = Math.random() + Date.now();
        localKeys.push(drawingKey);
        const path = {
            type, data, color: curColor, key: drawingKey
        }


        // globalPaths.push(path);


        canvas.onmousemove = throttle(ev => {

            const x = ev.pageX - canvas.offsetLeft;
            const y = ev.pageY - canvas.offsetTop;

            curTool.move(x, y);
            // 移除本次路径的上传部分，以免重绘
            socket.emit('removePath', drawingKey);
            socket.emit("addPath", path);
            // 不包含 本地本次的绘制路径，避免重复
            render(globalPaths);

            // 绘制本地本次
            curTool.draw(ctx, curColor);
            ev.preventDefault();

        }, 16)


        canvas.onmouseup = ev => {

            canvas.onmousemove = null;
            canvas.onmouseup = null;

            drawingKey = null;

        }


    }


}

function render(paths) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  解决 jpeg 黑背景
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, W, H);
    paths.forEach(path => {

        const tool = toolsData.find(({type}) => type === path.type).value;

        tool.draw(ctx, path.color, path.data);
    })


}









