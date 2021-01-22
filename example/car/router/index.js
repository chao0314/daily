const KoaRouter = require('koa-router');
const staticServe = require('../middleware/staticServe');
const admin = require('./admin');
const api = require('./api');
const image =  require('./image');

let router = new KoaRouter();

router.get('/static', staticServe);

router.use('/admin', admin);

router.use('/api', api);

router.use('/image',image);

exports = module.exports = router.routes();