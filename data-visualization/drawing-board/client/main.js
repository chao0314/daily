//初始化
let canvas=document.getElementById('c1');
let gd=canvas.getContext('2d');

let W=canvas.width;
let H=canvas.height;

let toolbarDiv=document.getElementById('toolbar');
let colorsDiv=document.getElementById('colors');
let operationsDiv=document.getElementById('operations');

let undoBtn=document.getElementById('undo');
let saveBtn=document.getElementById('save');

//当前选中
let curTool=0;
let curColor=0;

//初始化
createToolBtns();
createColorBtns();

let tools=Array.from(toolbarDiv.children);
let colors=Array.from(colorsDiv.children);

// socket连接服务器
let socket=io.connect();
let globalPaths=[];

socket.on('init', ({uid, paths})=>{
  //初始
  globalPaths=paths;

  //更新
  socket.on('pathupdate', paths=>{
    globalPaths=paths.filter(path=>path.key!==drawingKey);
    render();
  });

  //绘图初始化
  initTools();
  initColors();

  //初始渲染
  render();

  //
  undoBtn.onclick=undo;
  document.onkeydown=function (ev){
    if(ev.ctrlKey && ev.key=='z'){
      undo();
    }
  };

  saveBtn.onclick=function (){
    //1-blog
    canvas.toBlob(blob=>{
      let formdata=new FormData();
      formdata.append('file', blob);

      axios.post('http://localhost:9002/upload', formdata).then(res=>{
        alert('上传成功');
      });
    }, 'image/jpeg');
    //2-axios.post
  };
});









//接收  on('name', function (参数){})
//emit  emit('name', 参数, ...)

//1-等待init
  //正常绘图