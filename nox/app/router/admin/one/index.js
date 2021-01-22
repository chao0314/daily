const Router = require('@/router');

class Index extends Router {

    constructor(...args) {
        super(...args);
    }


    async get(ctx, next) {
        console.log("----get one",a)
        ctx.body = await new Promise(resolve => {

            setTimeout(() => {
                resolve('hello world one')
            }, 1000);

        })

        await next();

    }

    post(ctx, next) {
        console.log('-------post')

    }


}


exports = module.exports = Index