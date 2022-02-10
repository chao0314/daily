const triangle={
  onStart(x, y){
    return {};
  },
  onMove(data, x, y, startX, startY){
    let w=x-startX;

    return {
      p1: {x: startX+w/2, y: startY},
      p2: {x, y},
      p3: {x: startX, y},
    };
  },
  draw(data){
    const {p1, p2, p3}=data;

    gd.moveTo(p1.x, p1.y);
    gd.lineTo(p2.x, p2.y);
    gd.lineTo(p3.x, p3.y);
    gd.closePath();
  },
};