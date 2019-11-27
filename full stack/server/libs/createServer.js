const Koa = require('koa');
const http = require('http');
const initDatabase = require('@/libs/initDatabase');
const initRedis = require('@/libs/initRedis');
const initSession = require('@/libs/initSession');
const initRender = require('@/libs/initRender');


module.exports = async function (config) {
    let {port, entry} = config;
    let app = new Koa();
    app.context.appConfig = config;
    await initDatabase();
    await initRedis();
    await initSession(app);
    await initRender(app);
    app.use(require(entry));
    // app.listen(port, () => console.log(`server on ${port}`));
    let server = http.createServer(app.callback());
    server.listen(port, () => console.log(`server on ${port}`));
    return server;
};