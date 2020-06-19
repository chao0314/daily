const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const tplEngine =  require('../../template');

let app = new Koa();

let router = new Router();
app.use(koaStatic(path.resolve(__dirname, '../public')));


router.use('detail', async ctx => {


})

app.use(router.routes());


app.listen(8080);