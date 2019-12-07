const Router = require('koa-router');
const router = new Router();
const {autoComplete} = require('@/models/KeyWord');


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
    ctx.body = await autoComplete(kw);

});


module.exports = router.routes();