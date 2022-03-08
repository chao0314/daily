const KoaRouter = require('koa-router');
const {handleMultipart} = require('./bodyHandler');
const router = new KoaRouter();

router.post('/upload', handleMultipart(), ctx => {

    ctx.body = {err: null};
})


exports = module.exports = router.routes();