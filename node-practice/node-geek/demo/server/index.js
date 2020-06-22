const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const TplEngine = require('../../template');
const remoteClient = require('./client');
let app = new Koa();
let router = new Router();
let tpl = new TplEngine(path.resolve(__dirname, '../views'))
app.use(koaStatic(path.resolve(__dirname, '../public')));


router.get('/detail', async ctx => {

    // console.log('id is ', ctx.query.id);
    let res = await remoteClient.send({
        schemaName: 'ColumnRequest',
        body: {columnid: 232}
    });
    // console.log(res);
    ctx.body = tpl.render('detail.html', res);

});

app.use(router.routes());


app.listen(8080, () => {
    console.log('bff server port : 8080');
});