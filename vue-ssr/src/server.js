const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaStatic = require('koa-static');
const {createBundleRenderer} = require('vue-server-renderer')
const serverBundleString = fs.readFileSync(path.resolve(__dirname, '../dist/server.bundle.js'), 'utf-8');
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundleString, {template});


const app = new Koa();
const router = new KoaRouter();


router.get('/api', async ctx => {

    ctx.body = 'this is api test' + Math.random();
})

router.get('/(.*)', async ctx => {
    ctx.body = await new Promise(resolve => {

        renderer.renderToString({url: ctx.url}, ({err, html}) => {

            if (err && (err.code === 404 || err.code === 500)) resolve('not found');
            else resolve(html);
        })

    })


})

app.use(koaStatic(path.resolve(__dirname, '../dist')));
app.use(router.routes());

app.listen(3000, () => console.log('server port 3000'));




