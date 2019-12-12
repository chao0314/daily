const Router = require('koa-router');
const router = new Router();
const {autoComplete} = require('@/models/KeyWord');
const {getShopByKeyword} = require('@/models/Shop');


router.use('*', async (ctx, next) => {
    if (ctx.method.toLowerCase() === 'options') {
        ctx.body = 'ok';
        return;
    }
    ctx.set('Access-Control-Allow-Origin', '*');
    await next()
});

router.get('/complete/:kw', async ctx => {
    let {kw} = ctx.params;
    kw = kw.trim();
    if (kw) ctx.body = await autoComplete(kw);
});

router.get('/search/:kw', async ctx => {
    let {kw} = ctx.params;
    let {page} = ctx.query||1;
    kw = kw.trim();
    if (kw) ctx.body = await getShopByKeyword(kw,page);
});


module.exports = router.routes();