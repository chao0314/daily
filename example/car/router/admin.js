const KoaRouter = require('koa-router');
const {handleUrlencoded, handleMultipart} = require('../middleware/bodyHandler');
const {adminLogin} = require('../service/login');
const banner = require('../service/banner');
const car = require('../service/car');
const message = require('../service/message');
const {uploadDir} = require('@config');
const path = require('path');
let router = new KoaRouter();

router.post('/login', handleUrlencoded(), async ctx => {
    //todo validate...

    let {username, password} = ctx.request.fields;
    let token = await adminLogin({username, password});
    if (token) ctx.body = {err: null, token};
    else {
        ctx.body = {err: true, code: 404};
        ctx.body = {err: true};
    }

})

router.get('/banner', async ctx => {
    let data = await banner.find();
    ctx.body = {
        err: null,
        data
    }

})

router.post('/banner', handleMultipart({uploadDir: path.join(uploadDir, "banner")}), async ctx => {

    let {title, sub_title, image} = ctx.request.fields;

    await banner.create({title, sub_title, image})

    ctx.body = {err: null};

})

router.del('/banner', async ctx => {

    let {ID} = ctx.query;
    if (ID) {
        await banner.deleteOne(ID);
        ctx.body = {err: null};
    } else ctx.body = {err: true, code: 404};


})

router.patch('/banner', handleMultipart({uploadDir: path.join(uploadDir, "banner")}), async ctx => {
    let {ID} = ctx.query;
    if (ID) {
        let {title, sub_title, image} = ctx.request.fields;
        await banner.updateOne(ID, {title, sub_title, image});
        ctx.body = {err: null};
    } else ctx.body = {err: true, code: 404};


})


router.get('/car', async ctx => {

    let {page, size} = ctx.query;

    let data = await car.find({}, page, size, null, {sort: {price: -1}});
    ctx.body = {
        err: null,
        data
    }


})

router.post('/car', handleMultipart({uploadDir: path.join(uploadDir, "car")}), async ctx => {

    let {title = '', price = '', featureKey = [], featureValue = [], description = '', images = []} = ctx.request.fields;

    await car.create({title, price, featureKey, featureValue, description, images});
    ctx.body = {err: null};

})

router.del('/car', async ctx => {

    let {ID} = ctx.query;
    if (ID) {
        await car.deleteOne(ID);
        ctx.body = {err: null};
    } else ctx.body = {err: true, code: 404};


})

router.patch('/car', handleMultipart({uploadDir: path.join(uploadDir, "car")}), async ctx => {

    let {ID} = ctx.query;
    if (ID) {
        let {title = '', price = '', featureKey = [], featureValue = [], description = '', image = []} = ctx.request.fields;
        await car.updateOne(ID, {title, price, featureKey, featureValue, description, image});
        ctx.body = {err: null};

    } else ctx.body = {err: true, code: 404};


})

router.get('/car/count', async ctx => {
    let data = await car.rowCount();
    ctx.body = {
        err: null,
        data
    }

})

router.get('/message', async ctx => {

    let {page = 1, size = 10} = ctx.query;
    let data = await message.find({}, page, size);
    ctx.body = {
        err: null,
        data
    }


})


router.del('/message', async ctx => {

    let {ID} = ctx.query;
    if (ID) {
        if (ID.includes(',')) await message.deleteMany(ID.split(','));
        else await message.deleteOne(ID);
        ctx.body = {err: null};
    } else ctx.body = {err: true, code: 404}


})

router.get('/message/count', async ctx => {
    let data = await message.rowCount();
    console.log(data);
    ctx.body = {err: null, data};
})


exports = module.exports = router.routes();