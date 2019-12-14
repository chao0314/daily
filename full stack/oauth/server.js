const path = require('path');
const mysql = require('promise-mysql');
const uuid = require('uuid/v4');
const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const KoaBetterBody = require('koa-better-body');
const KoaConvert = require('koa-convert');
const app = new Koa();
const router = new Router();
const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'meituan'
};
let db;
(async () => {
    db = await mysql.createPool(config);
})();

app.use(KoaStatic(path.resolve(__dirname, './static')));

app.use(KoaConvert(KoaBetterBody()));
router.use('*', async (ctx, next) => {

    if (ctx.method.toLowerCase() === 'options') {
        ctx = 'success';
        return;
    }
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Method', '*');
    ctx.set('Access-Control-Allow-Headers', '*');

    await next();
});

router.get('/checklogin', async ctx => {
    let {token, expire} = JSON.parse(ctx.cookies.get('token'));
    let {from} = ctx.query;
    console.log(token, expire);
    if (token && expire) {
        const query = [`SELECT * FROM meituan.user_token_table WHERE  token = ? AND  token_expire < ?`, [token, expire]];
        let rows = db.query(...query);
        if (rows.length > 0) {
            ctx.redirect(`${from}?checked=true&token=${token}`);
            return;
        }
    }

    ctx.redirect(`${from}?checked=false`);

});

router.post('/login', async ctx => {

    let {name, password, from} = ctx.request.fields;
    //todo
    //1 如果没有这个用户 那么创建一个
    //2 如果有，检验密码，密码不正确，拒绝；密码正确，创建token

    if (name && password) {
        // const query = [`SELECT * FROM meituan.user_table WHERE name = ? AND password = ?`, [name, password]];
        // let rows = db.query(...query);
        // if(rows.length >0){
        //   // todo
        // }
        const token = uuid();
        const expire = Math.floor(Date.now() / 1000) + 30 * 86400;

        const query = [`INSERT INTO user_token_table (name,token,token_expire) VALUES (?,?,?)`, [name, token, expire]];
        const res = await db.query(...query);
        console.log(res);
        ctx.cookies.set('token', JSON.stringify({token, expire}));
        ctx.redirect(`${from}?login=true&token=${token}`);

    } else {
        ctx.redirect(`${from}?login=false`)
    }


});


app.use(router.routes());

app.listen(8080);