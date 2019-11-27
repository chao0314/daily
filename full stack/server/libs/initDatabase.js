const {databases} = require('@/config');
const mysql = require('promise-mysql');
const {setPool, getPool} = require("@/modules/databasePools");


module.exports = async function () {
    for (let db in databases) {
        if (databases.hasOwnProperty(db) && !getPool(db)) {
            let pool = await mysql.createPool(databases[db]);
            //await pool.query('SHOW TABLES');
            setPool(db, pool);
        }
    }

};