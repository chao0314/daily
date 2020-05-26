const Koa = require('../koa-demo');
// const Koa =  require('koa');
const fs = require('fs');
const path = require('path');
const upload = require('./src/upload');


const app = new Koa();

app.use(async (ctx, next) => {
    if (ctx.url.includes('.ico')) return;
    if (ctx.url === '/') {
        ctx.res.setHeader('Content-Type', 'text/html;charset=utf8');
        ctx.body = fs.createReadStream(path.join(__dirname, './index.html'));

    } else await next();
})
app.use(upload({dir: './uploadTemp'}));

app.listen(3000);
