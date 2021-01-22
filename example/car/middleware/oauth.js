const {routeWhiteList} = require('../config');
const {verify} = require('../service/jwt');
exports = module.exports = async function (ctx, next) {
    let url = ctx.url;
    if (routeWhiteList.includes(url)) return await next();
    let token = ctx.get('token') || ctx.query.token;
    token = token.trim();
    if (token) {
        let decoded = await verify(token);
        console.log("token decoded is ", decoded);
        if (decoded) await next();
        else {
            ctx.status = 403;
            ctx.body = 'Forbidden,Token Invalid';
        }
    }else{

        ctx.status = 401;
        ctx.body = 'Unauthorized';
    }


}