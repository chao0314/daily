const Koa = require('./src/index');

const app = new Koa();

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
