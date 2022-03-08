const Koa = require('koa');
const {port} = require("./config");
const static = require('./static');
const router = require('./router');
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    //10min
    ctx.set('Access-Control-Max-Age', 600);
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS,PATCH,DELETE');
    if (ctx.method.toLowerCase() === 'options') {
        ctx.status = 200;
        return;
    }

    try {
        await next()
    } catch (e) {
        console.log('uncaughtException', e);
        let msg = e.message;
        if (msg.includes('code')) {
            let {code, msg} = JSON.parse(msg);
            ctx.status = code;
            ctx.body = {err: true, msg};
        } else {
            ctx.status = 500;
            ctx.body = {err: true, msg: 'server internal error'};
        }


    }
})

app.use(static);
app.use(router);


app.use(ctx => {

    if (!ctx.body) {
        ctx.status = 404;
        ctx.body = {err: true, msg: 'server not found'};
    }
})


app.listen(port, () => console.log(`server port ${port}`));