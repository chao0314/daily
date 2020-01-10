const {databases} = require('@/config');
const mysql = require('promise-mysql');
const {setPool, getPool} = require("@/modules/databasePools");


module.exports = async function () {
    for (let db in databases) {
        if (databases.hasOwnProperty(db) && !getPool(db)) {
            let pool = await mysql.createPool(databases[db]);
            //await pool.query('SHOW TABLES');
            pool.insert = async function (table, value) {
                const columns = Object.keys(value);
                const values = Object.values(value);
                const query = [`INSERT INTO ?? (${columns.map(k => '??')}) VALUE (${values.map(v => '?')})`, [table, ...columns, ...values]];
                return await this.query(...query);
            };
            setPool(db, pool);
        }
    }

};