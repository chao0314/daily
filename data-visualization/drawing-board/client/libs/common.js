//
let toolDatas={
  '线': line,
  '椭圆': ellipse,
  '矩形': rect,
  '三角': triangle,
};

let colorDatas=[
  {title: '黑色', color: '#000'},
  {title: '灰色', color: '#666'},
  {title: '浅灰', color: '#ccc'},
  {title: '红色', color: '#F00'},
  {title: '绿色', color: '#0F0'},
  {title: '黄色', color: '#FF0'},
  {title: '蓝色', color: '#00F'},
  {title: '紫色', color: '#F0F'},
];

function pos(ev){
  let x=ev.pageX-canvas.offsetLeft;
  let y=ev.pageY-canvas.offsetTop;

  return {x,y};
}