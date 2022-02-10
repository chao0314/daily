const line = {};
const ellipse = {};
const rect = {};
const triangle = {};

const toolsData = [
    {label: "线", value: line},
    {label: "椭圆", value: ellipse},
    {label: "矩形", value: rect},
    {label: "三角", value: triangle},

]

const colorsData = [
    {title: '黑色', color: '#000'},
    {title: '灰色', color: '#666'},
    {title: '浅灰', color: '#ccc'},
    {title: '红色', color: '#F00'},
    {title: '绿色', color: '#0F0'},
    {title: '黄色', color: '#FF0'},
    {title: '蓝色', color: '#00F'},
    {title: '紫色', color: '#F0F'},
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
const operations = document.getElementById('operations');
const undoBtn = document.getElementById('undo');
const saveBtn = document.getElementById('save');

//当前选中
let curTool = 0;
let curColor = 0;


initTools(toolsData);

function initTools(toolsData) {

    toolsData.forEach(({label, value}) => {

        const tool = document.createElement("button");
        tool.setAttribute("type", "button");
        tool.innerHTML = label;
        tool.addEventListener("click", ev => {
            console.log(label);
            tool.setAttribute("class", "active");

        })

        toolbar.appendChild(tool);
    })


}





