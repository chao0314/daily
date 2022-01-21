1 设置画布大小要有标签上的 with height 属性，而不是css属性，否则画布拉伸失真

2 画布开始时，要清除路径  beginPath ,否则路径会和前面已存在的路径关联

3 moveTo lineTo closePtah  fill填充 stroke描边  fillStyle  strokeStyle
lineWith

4 fillStyle = strokeStyle =  createLinearGradient/createRadialGradient

const gradient =createLinearGradient(x0,y0,x1,y1);
const gradient =crateRadialGradient(x0,y0,r0,x1,y1,r1);
cons gradient =  createPattern(image,repetition);
gradient.addColorStop(position(0-1),color);

5 文字

fillText(str,x,y)  strokeText(str,x,y) font='bold italic 20px 字体'; 设置字体 基本同css
字体默认是左下基线对齐 而非常识中的左上角,可以设置改变

textAlign = 'left'||'center'||'right'; 调整水平轴
textBaseAlign = 'alphabetic'||'bottom'||'top'||'middle'; 调整垂直轴

默认： left  alphabetic
textAlign = "left" testBaseAlign =  "top"  改变设置为左上角

measureText(str) 测量字体的宽度 {with:xxx}

6 线

lineCap  设置线头的样式  butt 默认 平线  round 圆 square 方 凸出一点

lineJoin 连线转折处的样式  miter 默认 尖角  round 圆角  bevel 平角

7 模糊等

globalAlpha  全局透明度

shadowColor 模糊颜色

shadowBlur 模糊宽度

shadowOffsetX shadowOffsetY  模糊偏移

8 矩形

fillReact(x,y w,h) stroke(x,y,w,h) 这两个直接处图像

react(x,y,w,h) 绘制路径

clearReact(x,y,w,h) 清理矩形区域 擦除

9 椭圆  圆

ellipse(cx,cy,r1,r2,rotation,starAng,endAng,antiClock= false)
        圆心  半径   旋转         角度          顺/逆时针

arc(cx,cy ,r startAng,endAng,antiClock= false)

ang 是弧度  2π = 360

二次贝塞尔曲线

quadraticCurveTo(cx,cy,x,y)
                控制点  终点

三次贝塞尔曲线

bezierCurveTo(cx,cy,cx1,cx2,x,y)

简单近似的可以将贝塞尔曲线看成是，起始点 到终点的连线，被控制点吸引成弧度的效果











