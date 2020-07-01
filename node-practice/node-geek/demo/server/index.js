const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const TplEngine = require('../../template');
// const remoteClient = require('./client');
const apolloServer = require('../apollo-server');
const serverRender = require('../ssr/server');
const mockData = require('../mockdata/column');
const fs = require('fs');
let app = new Koa();
let router = new Router();
let tpl = new TplEngine(path.resolve(__dirname, '../views'))

let r2 = new Router();

const cache11 = [];

r2.get('/download', ctx => {
    // console.log('read file sync');
    let s = 'abcdefg111123456789009876543222222222234567890abcdefg111123456789009876543222222222234567890abcdefg111123456789009876543222222222234567890' + Math.random()
    cache11.push(s);
    ctx.set('Content-type', 'text/html;charset=utf-8');
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../public/download.html'));

})

app.use(r2.routes());

app.use(koaStatic(path.resolve(__dirname, '../public')));

//rpc
// router.get('/detail', async ctx => {
//
//     // console.log('id is ', ctx.query.id);
//     let res = await remoteClient.send({
//         schemaName: 'ColumnRequest',
//         body: {columnid: 232}
//     });
//     // console.log(res);
//     ctx.body = tpl.render('detail.html', res);
//
// });

//ssr

router.get('/list', async ctx => {
    //cache ???
    let ssrString = serverRender({columns: mockData});
    // console.log('-----', ssrString);
    ctx.body = tpl.render('list.html', {
        ssrString,
        ssrData: mockData,
        filterType: ctx.query.filt || 0,
        sortType: ctx.query.sortType || 0

    })

})


app.use(router.routes());

//graphql
app.use(apolloServer.getMiddleware({path: '/api'}))


app.listen(8080, () => {
    console.log('bff server port : 8080');
});