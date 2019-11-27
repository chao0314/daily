const keys = require('@/keys');
const session = require('koa-session');
const {getPool} = require('@/modules/redisPools');


module.exports = async function (app) {
    const main = getPool('main');
    app.keys = keys;
    app.use(session({
        maxAge: 2 * 3600 * 1000,
        autoCommit: true,
        renew: true,
        httpOnly: true,
        signed: true,
        store: {
            async get(key, maxAge) {
                try {
                    return JSON.parse(await main.getAsync(key));
                } catch (e) {

                    return {};
                }
            },
            async set(key, session, maxAge) {
                await main.psetexAsync(key, maxAge, JSON.stringify(session));
            },
            async destroy(key) {
                await main.delAsync(key);
            }
        }

    }, app))

};