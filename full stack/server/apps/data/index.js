const Router = require('koa-router');
const router = new Router();

router.get('/da', ctx => {

    console.log(ctx.query);
    ctx.body = 'success';
});

module.exports = router.routes();