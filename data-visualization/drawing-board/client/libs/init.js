//初始化颜色按钮
function createColorBtns(){
  colorDatas.forEach(({title, color})=>{
    let oBtn=document.createElement('button');
    oBtn.type='button';
    oBtn.innerHTML=title;

    colorsDiv.appendChild(oBtn);
  });
}

function createToolBtns(){
  for(let title in toolDatas){
    let oBtn=document.createElement('button');
    oBtn.type='button';
    oBtn.innerHTML=title;

    toolbarDiv.appendChild(oBtn);
  }
}

//初始选择
function initTools(){
  const toolArray=[];
  for(let title in toolDatas)
    toolArray.push({title, builder: toolDatas[title]});

  tools[curTool].className='active';
  
  const {title, builder}=toolArray[curTool];
  startDraw(title, builder);
  
  tools.forEach((btn,index)=>{
    btn.onclick=function (){
      curTool=index;

      tools.forEach(btn=>btn.className='');
      tools[index].className='active';

      //构建绘制工具
      const {title, builder}=toolArray[index];
      startDraw(title, builder);
    };
  });
}

function initColors(){
  colors[curColor].className='active';
  colors.forEach((btn,index)=>{
    btn.onclick=function (){
      curColor=index;

      colors.forEach(btn=>btn.className='');
      colors[index].className='active';
    };
  });
}

