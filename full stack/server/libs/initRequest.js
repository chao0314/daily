const {staticServer} = require('@/config');

module.exports = async function (ctx, next) {
    let st = ctx.cookies.get('st');
    if (staticServer.includes(st)) ctx.setDefaultRenderOptions('STATIC', st);
    else {
        st = staticServer[Math.floor(Math.random() * staticServer.length)];
        console.log(st);
        ctx.cookies.set('st', st);

    }
    ctx.setDefaultRenderOptions('STATIC', `http://${st}`);
    ctx.setDefaultRenderOptions('city', 'bj');

    await next();
};