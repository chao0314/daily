const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const tplEngine = require('../../template');
const remoteClient = require('./client');
let app = new Koa();
let router = new Router();
app.use(koaStatic(path.resolve(__dirname, '../public')));


router.get('/detail', async ctx => {

    // console.log('id is ', ctx.query.id);
    let res = await remoteClient.send({columnid: 232});
    console.log(res);
    ctx.body = res;

});

app.use(router.routes());


app.listen(8080, () => {
    console.log('bff server port : 8080');
});