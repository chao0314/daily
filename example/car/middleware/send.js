const send = require('koa-send');
const {uploadDir} = require('@config');

exports = module.exports = function (defaultOptions = {}) {


    return async function (ctx, next) {

        ctx.selfSend = async function (name, options = {}) {
            options = Object.assign(defaultOptions, options)
            let {root = uploadDir, maxAge = 60 * 86400 * 1000} = options;
            try {
                await send(this, name, {root, maxage: maxAge});
            } catch (e) {
                console.log(e);
                ctx.status = 404;
            }


        }

        await next();

    }

}