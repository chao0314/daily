const line={
  onStart(x, y){
    return [{x,y}];
  },
  onMove(data, x, y, startX, startY){
    data.push({x,y});
    return data;
  },
  draw(data){
    data.forEach(({x,y},index)=>{
      if(index==0)
        gd.moveTo(x,y);
      else
        gd.lineTo(x,y);
    });
  },
};