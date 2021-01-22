const Router = require('@/router');

class Index extends Router {

    constructor(...args) {
        super(...args);

    }


    async get(ctx, next) {
        console.log('----get----');
        let user = {name: "hi", password: '123456'}
        let controller = this.map('login');
        let result = await controller.login(user);
        ctx.body = result ? 'hello world' : "name or password wrong";


    }

    post(ctx, next) {
        console.log('-------post')

    }


}


exports = module.exports = new Index();