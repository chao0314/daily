const fs=require('fs');
const http=require('http');

const server = http.createServer((req, res) => {
  const path=__dirname + '/static' + (req.url=='/'?'/index.html':req.url);

  try{
    const content=fs.readFileSync(path, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(content));
    res.end(content);
  }catch(e){
    res.writeHead(404);
    res.end('not found');
  }
});

const io = require('socket.io')(server);
server.listen(9003, ()=>console.log('listen at localhost:9003'));

//-----------------------------------

//
let paths=[];

const uuid=require('uuid').v4;
io.on('connection', socket => {
  const uid=uuid();

  socket.emit('init', {uid, paths});

  socket.on('addPath', path=>{
    paths.push(path);

    io.emit('pathupdate', paths);
  });
  socket.on('removePath', key=>{
    paths=paths.filter(path=>path.key!=key);

    io.emit('pathupdate', paths);
  });
});
