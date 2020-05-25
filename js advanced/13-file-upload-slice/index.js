const Koa = require('koa');
const Router = require('koa-router');
const betterBody = require('koa-better-body');
const convert = require('koa-convert');
const koaSatic = require('koa-static');
const pfs = require('fs-promise');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const router = new Router;
const dirTemp = {}; //redis

app.use(koaSatic(path.resolve(__dirname, './upload')));

router.use(convert(betterBody()));
router.use('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Method', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    await next();
});

router.post('/api/upload', async ctx => {
    // console.log("/api/upload", ctx.request.files);
    let file = ctx.request.files[0];
    let filename = ctx.request.fields.filename;
    let [index, dirName] = filename.split('-');
    if (!dirTemp[dirName]) {
        fs.mkdirSync(path.resolve(__dirname, `./upload/${dirName}`));
        dirTemp[dirName] = true;
    }
    let rs = await pfs.createReadStream(file.path);
    let ws = await pfs.createWriteStream(path.resolve(__dirname, `./upload/${dirName}/${index}`));
    rs.pipe(ws);
    ctx.body = await new Promise((resolve) => {
        rs.on('close', () => {
            console.log('part file stream close');
            resolve('upload  part success');
        });
    })

});
router.get('/api/merge', async ctx => {
    let {name} = ctx.request.query;
    console.log('merge api file name is ', name);
    let files = await pfs.readdir(path.resolve(__dirname, `./upload/${name}`));
    files = files.sort((pre, next) => Number(pre) - Number(next)).map(file => `./upload/${name}/${file}`);
    console.log(files);
    let pipe = async (rpath, wpath) => {
        let ws = await pfs.createWriteStream(path.resolve(__dirname, wpath), {flags: 'a'});
        let rs = await pfs.createReadStream(rpath);
        rs.pipe(ws);
        await new Promise(resolve => {
            ws.on('close', () => {
                console.log('ws close');
                resolve()
            })
        })
    };

    let sname = Date.now() + name;
    for (let i = 0; i < files.length; i++) {
        await pipe(files[i], path.resolve(__dirname, `./upload/${sname}`));
    }

    pfs.rmdir(path.resolve(__dirname, `./upload/${name}`), {recursive: true});
    ctx.body = sname;
});


app.use(router.routes());
app.listen(3000, () => console.log('server on 3000 port'));