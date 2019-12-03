const uuid = require('uuid/v4');
const {staticServer} = require('@/config');

module.exports = async function (ctx, next) {
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


    ctx.setDefaultRenderOptions('STATIC', `http://${st}`);
    ctx.setDefaultRenderOptions('city', 'bj');

    await next();
};