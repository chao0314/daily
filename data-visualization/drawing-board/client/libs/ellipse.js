const ellipse={
  onStart(x, y){
    return {};
  },
  onMove(data, x, y, startX, startY){
    let rx=Math.abs((x-startX)/2);
    let ry=Math.abs((y-startY)/2);

    let cx=Math.min(x, startX)+rx;
    let cy=Math.min(y, startY)+ry;

    return {cx,cy,rx,ry};
  },
  draw(data){
    const {cx, cy, rx, ry}=data;
    gd.ellipse(cx, cy, rx, ry, 0, 0, 2*Math.PI);
  },
};

