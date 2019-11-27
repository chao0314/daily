const Router = require('koa-router');

let router = new Router();

router.get('/index', async ctx => {
    ctx.body = "hello index";
});

module.exports = router.routes();