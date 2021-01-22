const KoaRouter = require('koa-router');
const {handleMultipart} = require('../middleware/bodyHandler');
const banner = require('../service/banner');
const car = require('../service/car');
const message = require('../service/message');


const router = new KoaRouter();

router.get('/banner', async ctx => {

    let data = await banner.find();
    ctx.body = {
        err: null,
        data
    }
})

router.get('/car', async ctx => {
    let {ID, page = 1, size = 5, sort = 'ID', order = -1} = ctx.query;
    let data;
    if (ID) data = await car.findByID(ID);
    else data = await car.find({}, page, size, null, {sort: {[sort]: order}});
    ctx.body = {
        err: null,
        data
    }
})


router.get('/car/recommend', async ctx => {

    let {page = 1, size = 6, sort = 'price', order = -1} = ctx.query;

    let data = await car.find({}, page, size, null, {sort: {[sort]: order}});
    ctx.body = {
        err: null,
        data
    }


})


router.post('/message', handleMultipart(), async ctx => {

    let doc = ctx.request.fields;
    await message.create(doc);
    ctx.body = {err: null};

})


exports = module.exports = router.routes();