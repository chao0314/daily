const {getPool} = require('@/modules/databasePools');
const {getPool: rPool} = require('@/modules/redisPools');
const db = getPool('main');
const rd = rPool('main');
const PREFIX = '_key_word_';
const SIZE = 10;


function merge(arr = [], arr2 = []) {
    arr2.forEach(v => {
        if (!arr.find(item => item.title === v.title))
            arr.push(v);
    });
    return arr;
}


async function autoComplete(kw) {
    let result = [];
    if (kw) {
        const aQuery = [
            [`CALL key_word(?,?)`, [`${kw}%`, SIZE]],

            [`SELECT 
    title
FROM
    meituan.catalog_table
WHERE
    title LIKE ?
LIMIT ? ;`, [`${kw}%`, SIZE]],

            [`SELECT 
    shopName AS title
FROM
    meituan.meishi_shop_table
WHERE
    shopName LIKE ?
LIMIT ? ;`, [`${kw}%`, SIZE]],
            [`SELECT 
    name AS title
FROM
    meituan.meishi_group_table
WHERE
    name LIKE ?
LIMIT ? ;`, [`${kw}%`, SIZE]]

        ];
        try {
            //let cache = await rd.getAsync(`${PREFIX}${kw}`);
            let cache;
            if (cache) result = JSON.parse(cache);
            else {
                for (let i = 0; i < aQuery.length; i++) {
                    let rows = await db.query(...aQuery[i]);
                    if (Array.isArray(rows[0])) rows = rows[0];
                    result = merge(result, rows);
                    if (result.length >= SIZE) break;
                }

                await rd.psetexAsync(`${PREFIX}${kw}`, 2 * 3600 * 1000, JSON.stringify(result));

            }

        } catch (e) {
            console.log(e);
        }

    }

    return result;

}

module.exports = {
    autoComplete
};






















