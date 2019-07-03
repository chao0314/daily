const Koa = require("koa");
const Router = require('koa-router');
const body = require('koa-better-body');
const koaStatic = require('koa-static');
const convert = require("koa-convert");
const fsp = require("fs").promises;
const path = require("path");

const app = new Koa();
let router = new Router();
app.use(convert(body({uploadDir: "./upload"})));
app.use(router.routes());
app.use(koaStatic("./static"));
const SIZE = 5 * 1024 * 1024;

router.use(async (ctx, next) => {
    //todo check request origin...
    ctx.set({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": '*',
        "Access-ControlAllow-Methods": '*'
    });
    await next();
});

router.post("/upload", async ctx => {
    console.log(ctx.request.files);
    ctx.status = 200;
    ctx.body = "is ok";
});

router.get("/video/:name", async ctx => {
    const {name} = ctx.params;
    const {block = 0} = ctx.query;
    console.log("---block", block);
    let handle;
    try {
        handle = await fsp.open(path.resolve(__dirname, 'video', name), "r");
        let {buffer, bytesRead} = await handle.read(Buffer.alloc(SIZE), 0, SIZE, SIZE * block);
        if (bytesRead < SIZE) {
            let temp = Buffer.alloc(bytesRead);
            temp.fill(buffer, 0, bytesRead);
            buffer = temp;
        }
        ctx.set({
            "Content-Type": "video/mp4",
            "Content-length": bytesRead,
            "Video-Length": (await handle.stat()).size,
            "Video-Block": SIZE
        });
        ctx.status = 200;
        ctx.body = buffer;
    } catch (e) {
        console.log(e);
    } finally {
        if (handle) await handle.close();
    }


});

router.get("/img/:name", async ctx => {
    const {name} = ctx.params;
    let handle;
    try {
        handle = await fsp.open(path.resolve(__dirname, "img", name), "r");
        let data = await handle.readFile();
        ctx.status = 200;
        ctx.set({
            "content-type": "image/jpeg",
            "content-length": handle.stat().size
        });
        ctx.body = data;
    } catch (e) {
        console.log(e);
    } finally {
        if (handle) await handle.close();
    }


});

app.listen(3000, () => {
    console.log("server in 3000")
});