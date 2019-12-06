const uuid = require('uuid/v4');
const {staticServer} = require('@/config');
const pfs = require('promise-fs');
const {getPool} = require('@/modules/redisPools');
const main = getPool('main');

module.exports = async function (ctx, next) {

    if (await main.getAsync(`_black_list_${ctx.ip}`)) {
        ctx.body = "访问异常，请等待15分钟";
        return;
    }
    let st = ctx.cookies.get('st');
    let uid = ctx.cookies.get('uid');
    if (staticServer.includes(st)) ctx.setDefaultRenderOptions('STATIC', st);
    else {
        st = staticServer[Math.floor(Math.random() * staticServer.length)];
        console.log(st);
        ctx.cookies.set('st', st);

    }
    //todo switch user id ?
    if (!uid) {
        ctx.cookies.set('uid', uuid().replace(/\-/g, ''), {
            maxAge: 90 * 86400 * 1000,
            httpOnly: false,
            signed: false
        })
    }
    // user behaviour record
    let log = JSON.stringify({
        url: ctx.url,
        ip: ctx.ip,
        time: Date.now()
    });
    console.log(log);
    await pfs.appendFile(`${ctx.appConfig.logDir}/access.log`, `${log}\n`);


    ctx.setDefaultRenderOptions('STATIC', `http://${st}`);
    ctx.setDefaultRenderOptions('city', 'bj');

    await next();
};