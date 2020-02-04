const mysql = require('promise-mysql');
const {name, databases, port} = require('./config');
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const uuid = require('uuid/v4');

let databasePool = {};

async function initDatabase(databases) {
    for (let db in databases) {
        if (databases.hasOwnProperty(db) && !databasePool[db]) {
            let pool = await mysql.createPool(databases[db]);
            //await pool.query('SHOW TABLES');
            pool.insert = async function (table, value) {
                const columns = Object.keys(value);
                const values = Object.values(value);
                const query = [`INSERT INTO ?? (${columns.map(k => '??')}) VALUE (${values.map(v => '?')})`, [table, ...columns, ...values]];
                return await this.query(...query);
            };
            databasePool[db] = pool;
        }
    }

}

router.use('*', async (ctx, next) => {
    console.log('server is :', name, ' ip is :', ctx.ip, 'ips is :', ctx.ips);
    await next();
});

router.get('/api/index', async ctx => {
    const query = [`SELECT * FROM test.test`];
    const rows = await databasePool['read'].query(...query);
    ctx.body = `hello server ${name} --- ${rows.map(({ID, time}) => `${ID} ${time}`)}`;
});
router.get('/api/insert', async ctx => {

    await databasePool['main'].insert('test.test', {
        ID: uuid().replace(/\-/g, ''),
        time: Math.floor(Date.now() / 1000)
    });

    ctx.body = `insert success ${name}`;
});

app.proxy = true;
app.use(router.routes());
app.listen(port, async () => {
    await initDatabase(databases);
    console.log(`server on ${port}`)
});
