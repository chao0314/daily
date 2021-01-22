const Router = require('@/router');

class Index extends Router {

    constructor(...args) {
        super(...args);
    }


    get(ctx, next) {
        console.log("----get three")
        ctx.body = 'hello world three'

    }

    post(ctx, next) {
        console.log('-------post')

    }


}


exports = module.exports = Index