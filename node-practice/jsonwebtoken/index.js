const crypto = require('crypto');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-better-body');
const koaStatic = require('koa-static');
const koaConvert = require('koa-convert');

const app = new Koa();
app.use(koaStatic);
app.use(koaConvert(koaBody()));




app.listen(3000, () => console.log('server port  3000'));


