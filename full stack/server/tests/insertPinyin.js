const mysql = require('promise-mysql');
const word2pinyin = require('../utils/pinyin');

(async function f() {

    let db = await mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'meituan'
    });

    let rows = await db.query(`SELECT * FROM catalog_item_table`);
    await db.query(`SET autocommit=0`);
    await db.query(`START TRANSACTION`);
    try {
        for (let i = 0; i < rows.length; i++) {
            let pinyin = word2pinyin(rows[i].title);
            await db.query(`UPDATE catalog_item_table SET title_pinyin = ? WHERE ID = ?`, [pinyin.join(','), rows[i].ID]);
        }
    } catch (e) {
        console.log(e);
        await db.query('ROLLBACK');
    }
    await db.query('COMMIT');
    console.log('insert pinyin success');

})();