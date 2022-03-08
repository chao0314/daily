const KoaRouter = require('koa-router');
const koaStatic = require('koa-static');
const {staticDir} = require('./config');
const DAY = 86400 * 1000;
let router = new KoaRouter();

router.get(/\.(jpg|png|gif|tiff|ico)$/i, koaStatic(staticDir, {maxage: 14 * DAY}));
router.get(/\.(html|htm|shtml)$/i, koaStatic(staticDir, {maxage: DAY}));
router.get(/\.jsx?$/i, koaStatic(staticDir, {maxage: 3 * DAY}));
router.get(/\.css$/i, koaStatic(staticDir, {maxage: 3 * DAY}));

exports = module.exports = router.routes();