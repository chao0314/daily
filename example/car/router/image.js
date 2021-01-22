const KoaRouter = require('koa-router');
const {uploadDir} = require('@config');
const path = require('path');
const router = new KoaRouter();


router.get('/car/:name', async ctx => {
    let {name} = ctx.params;

    await ctx.selfSend(name, {root: path.join(uploadDir, 'car')});

});
router.get('/banner/:name', async ctx => {
    let {name} = ctx.params;
    await ctx.selfSend(name, {root: path.join(uploadDir, 'banner')});

})


exports = module.exports = router.routes();