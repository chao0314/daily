
const Router = require('koa-router');
const router = new Router();
const Schema = require('async-validate');
const rules = require('../../../rules');
const md5 = require('@/utils/md5');
const uuid = require('@/utils/uuid');
const shop = require('./shop');
const {getAdminUserByName, insertAdminUser, getAuthorityByID} = require('../../../models/AdminUser');
const {checkToken, setToken,} = require('../../../models/AdminUserToken');
Schema.plugin([
    require('async-validate/plugin/object'),
    require('async-validate/plugin/string'),
    require('async-validate/plugin/utils')
]);

router.post('/register', async ctx => {

    const {username, password, parent = 0} = ctx.request.fields;
    let descriptor = {
        type: 'object',
        fields: {
            username: rules.username,
            password: rules.password
        }
    };
    let schema = new Schema(descriptor);
    ctx.body = await new Promise(resolve => {
        schema.validate({username, password}, async (err, res) => {
            if (err) throw err;
            else if (res && res.errors.length > 0) {
                console.log(res.errors[0].message);
                resolve({err: true, res: res.errors[0].message});
            } else {
                let users = await getAdminUserByName(username);
                console.log(users);
                if (users.length === 0) {
                    await insertAdminUser(username, md5(password));
                    resolve({res: "register success"});
                } else resolve({err: true, res: 'user name exist'});
            }
        });
    });

});

router.post('/login', async ctx => {

    const {username, password} = ctx.request.fields;
    //todo 校验 ......

    let users = await getAdminUserByName(username);
    if (users.length === 1 && users[0].password === md5(password)) {
        let token = uuid();
        let token_expires = Math.floor(Date.now() / 1000 + 86400 * 14);
        await setToken(username, token, token_expires);
        let authority = await getAuthorityByID(users[0].ID);

        ctx.body = {token, token_expires, authority, res: 'login success'};

    } else {
        ctx.body = {err: true, res: 'name or password error'};
    }


});

router.all('*', async (ctx, next) => {
    const token = ctx.get('token');
    if (!token) {
        ctx.status = 401;
        ctx.body = {err: true, res: 'no token'};
        return;
    }
    let username = await checkToken(token);
    if (!username) {
        ctx.status = 401;
        ctx.body = {err: true, res: 'invalid token'};
    } else {
        ctx.adminUser = (await getAdminUserByName(username))[0];
        await next();
    }
});
router.use('/shop', shop);

module.exports = router.routes();