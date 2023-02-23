const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const app = new Koa();
const router = new Router();

app.use(KoaStatic(path.resolve(__dirname, './static')));



app.use(router.routes());

app.listen(8081);