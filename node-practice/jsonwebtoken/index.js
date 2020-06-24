const crypto = require('crypto');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-better-body');
const koaStatic = require('koa-static');
const koaConvert = require('koa-convert');
const Jwt = require('./src/jwt');
const secret = 'hello world';
const jwt = new Jwt({secret});
const router = new Router();

const app = new Koa();
app.use(async (ctx, next) => {
    console.log('--------')
    await next()
});
app.use(koaConvert(koaBody()));

router.post('/login', async ctx => {
    console.log('--login');
    let {name, password} = ctx.request.fields;
    console.log("login", name, password);
    let token = jwt.sign({name, password});
    ctx.body = {
        name,
        token
    }

})

router.get('/verify', ctx => {

    let token = ctx.get('authorization');
    console.log('token', token);
    let result = jwt.verify(token)
    if (result) ctx.body = result;
    else {
        ctx.status = 401;
        ctx.body = 'not login in';
    }

})
app.use(router.routes());


app.listen(3000, () => console.log('server port  3000'));


