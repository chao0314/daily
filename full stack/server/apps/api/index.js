const Router = require('koa-router');
const router = new Router();
const admin = require('./admin');
const {autoComplete} = require('@/models/KeyWord');
const {getShopByKeyword} = require('@/models/Shop');
const {getUserByMobile, register, login} = require('@/models/User');
const {getPool} = require('@/modules/redisPools');
const rd = getPool('main');
const in_code_wait_time_ = 'in_code_wait_time_';
const in_sms_valid_time_ = 'in_sms_valid_time_';
const password_error_number_times_ = 'password_error_number_times_ ';
const limit_login_ = 'limit_login_';
const max_error_number = 5;


router.use('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    if (ctx.method.toLowerCase() === 'options') {
        ctx.body = 'ok';
        return;
    }

    ctx.assert = function (value, message = 'invalid argument', status = 401) {
        if (!value) {
            let error = new Error(message);
            error.status = status;
            throw error;
        }
    };
    try {
        await next();
    } catch (e) {
        console.log(e);
        if (e.status) {
            ctx.status = e.status;
            ctx.body = e.message;
        } else {
            ctx.status = 500;
            ctx.body = 'internal server error';
        }
    }
});

router.get('/complete/:kw', async ctx => {
    let {kw} = ctx.params;
    kw = kw.trim();
    if (kw) ctx.body = await autoComplete(kw);
});

router.get('/search/:kw', async ctx => {
    let {kw} = ctx.params;
    let {page} = ctx.query || 1;
    kw = kw.trim();
    if (kw) ctx.body = await getShopByKeyword(kw, page);
});

router.get('/code', async ctx => {
    let {mobile} = ctx.query;
    ctx.assert(mobile);
    ctx.assert(/^(\+?86)?\d{11}$/.test(mobile));
    //如果用mobile 可能受恶意换号，ip 代价大些，但是有可能一个公司只有一个外网ip情况；
    ctx.assert(!(await rd.getAsync(`${in_code_wait_time_}${ctx.ip}`)), '验证码等待60秒');
    let user = await getUserByMobile(mobile);
    ctx.assert(user.length === 0, '手机号已经注册');
    //可以发送验证码了
    let code = Math.floor(Math.random() * 900000 + 100000);
    //todo 短信接口 api;
    console.log(code);
    //将短信验证码存储起来
    ctx.session.sms_mobile = mobile;

    rd.psetexAsync(`${in_code_wait_time_}${ctx.ip}`, 60 * 1000, true);
    rd.psetexAsync(`${in_sms_valid_time_}${mobile}`, 5 * 60 * 1000, code);
    ctx.body = 'success';

});
router.post('/register', async ctx => {
    let {mobile, password, code} = ctx.request.fields;
    console.log(mobile, password, code);
    ctx.assert(mobile, '手机号为空');
    ctx.assert(/^(\+?86)?\d{11}$/.test(mobile));
    ctx.assert(ctx.session.sms_mobile === mobile, '手机号码不匹配');
    ctx.assert(password, '密码为空');
    ctx.assert(/^.{6,}$/.test(password), '密码不能少于六位');
    ctx.assert(code, '验证码为空');
    let sendCode = await rd.getAsync(`${in_sms_valid_time_}${mobile}`);
    ctx.assert(sendCode, '验证码已过期');
    console.log(sendCode, code);
    ctx.assert(Number(code) === Number(sendCode), '验证码错误');
    let user = await getUserByMobile(mobile);
    ctx.assert(user.length === 0, '手机号已经注册');

    //注册
    await register(mobile, password);

    ctx.body = 'success';
});

router.post('/login', async ctx => {
    let {mobile, password} = ctx.request.fields;
    console.log(mobile, password);
    ctx.assert(mobile, '账号为空');
    ctx.assert(password, '密码为空');
    let isLimitLogin = await rd.getAsync(`${limit_login_}${mobile}`);
    ctx.assert(!isLimitLogin, '密码错误次数过多,明天再试');

    let {error} = await login(mobile, password);
    if (error) {
        let count = Number(rd.getAsync(`${password_error_number_times_}${mobile}`));
        count++;
        if (count >= max_error_number)
            rd.psetexAsync(`${limit_login_}${mobile}`, 24 * 60 * 60 * 1000, true);
        else
            rd.psetexAsync(`${password_error_number_times_}${mobile}`, 15 * 60 * 1000, count);
        ctx.status = 401;
        ctx.body = '账号或密码错误';
    } else {
        //todo token
        ctx.body = 'success';
    }


});

router.use('/admin', admin);

module.exports = router.routes();