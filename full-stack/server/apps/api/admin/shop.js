const Router = require('koa-router');
const router = new Router();
const {insertShop} = require('@/models/Shop');

router.post('/', async ctx => {

    const shop = ctx.request.fields;
    const ownerID = ctx.adminUser.ID;
    console.log("---post shop", shop, ownerID);
    //todo check shop data;
    await insertShop(shop, ownerID);
    ctx.body = {msg: 'success'};
});


module.exports = router.routes();