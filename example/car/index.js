require('module-alias/register');
const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const oauth = require('./middleware/oauth');
const router = require('./router/index');
const {port, store: {db: {uri, option}, cache}} = require('./config');
const send = require('./middleware/send');

mongoose.connect(uri, option).catch(err => console.log('mongoose', err));


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

// temporary
// app.use(oauth);

app.use(send());

app.use(router);


app.use(ctx => {

    if (!ctx.body) {
        ctx.status = 404;
        ctx.body = {err: true, msg: 'server not found'};
    }
})


app.listen(port, () => console.log(`server port ${port}`));


