const Koa = require('./src/index');
const Router = require('../koa-router/src');

const app = new Koa();


const router1 = new Router();
const router2 = new Router();

router1.get('/get/one', ctx => {
    ctx.body = '/get/one';
});

router2.get('/one', ctx => {
    ctx.body = '/child/one';
});


router1.use('/child', router2.routes());

app.use(router1.routes());



app.use(async (ctx, next) => {

    console.log('1')
    await next();
    console.log('2')

})

app.use(async (ctx, next) => {

    console.log('3')
    await next();
    console.log('4')

})
app.use(async (ctx, next) => {

    console.log('5')
    await next();
    ctx.body = 'hello world';
    console.log('6')

})


app.on('error', (e, ctx) => {
    console.log('----error---', e);
    ctx.res.statusCode = 500;
    ctx.res.end('server internal error');
})


app.listen(8090);
