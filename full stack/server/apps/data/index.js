const Router = require('koa-router');
const router = new Router();
const pfs = require('promise-fs');
const formatDate = require('@/utils/formatDate');
const path = require('path');

router.get('/da', async ctx => {

    let aData = Buffer.from(ctx.query.d, "base64").toString();
    let aWriteData = [];
    try {
        aData = JSON.parse(aData);
        aWriteData = aData.map(v => {
            return JSON.stringify({
                ...v,
                ip: "todo some settings of nginx",
                ua: ctx.get('user-agent'),
                uid: ctx.cookies.get('uid') || v.uid,
                time: Date.now()
            })
        })
    } catch (e) {
        aWriteData.push(aData);
    }
    let name = path.resolve(__dirname, `../../burying_data/${formatDate(new Date())}.txt`);

    await pfs.appendFile(name, aWriteData.join('\n') + '\n');

    ctx.body = 'success';
});

module.exports = router.routes();