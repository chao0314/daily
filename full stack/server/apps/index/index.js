const Router = require('koa-router');

const initRequest = require('@/libs/initRequest');
const {getCatalog} = require('@/models/Catalog');
const {getBanner} = require('@/models/Banner');
const {getShopDetailByID} = require('@/models/Shop');
const {getListByUserID} = require('@/models/BuyCart');
const {getOrdersByUserID} = require('@/models/BuyOrders');

const router = new Router();
router.use('*', initRequest);

router.get('/', async ctx => {

    let {render: ssr} = require('@/ssr/index');

    let [catalog, banner] = await Promise.all([getCatalog(), getBanner()]);


    let appData = {
        STATIC: ctx.getDefaultRenderOptions('STATIC'),
        city: ctx.getDefaultRenderOptions('city'),
        catalog,
        banner
    };
    let ssrString = ssr(appData);

    await ctx.render('index', {appData, ssrString});
});

router.get('/list', async ctx => {
    let {kw} = ctx.query;
    kw = kw.trim() || '';
    await ctx.render('list', {kw});
});


router.get('/shop/:id', async ctx => {
    let {id} = ctx.params;
    console.log(id);
    let shop = await getShopDetailByID(id);
    await ctx.render('shop', {shop});
});

router.get('/buy/cart', async ctx => {
    let list = await getListByUserID('123456');
    console.log('cart list',list);
    await ctx.render('cart', {});

});

router.get('/buy/orders', async ctx => {
    let orders = await getOrdersByUserID('123456');
    console.log('orders',orders);
    await ctx.render('orders', {});

});

router.get('/buy/order/:id', async ctx => {
    await ctx.render('order-detail', {});

});


// router.get('/redis', async ctx => {
//     console.log("session", ctx.session);
//     if (!ctx.session.name) {
//         ctx.session.name = 'wang';
//         ctx.session.times = 1;
//     }
//     ctx.body = `hello ${ctx.session.name} ${ctx.session.times++}`;
//
// });

// router.get('/index.html', async ctx => {
//     console.log("index.html");
//
//     await ctx.render('index', {
//         name: "wang",
//         age: 18,
//         list: [1, 2, 3, 4, 5]
//     });
//     await ctx.writeCache('index.html', ctx.body);
//
// });


module.exports = router.routes();