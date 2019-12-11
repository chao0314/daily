const {getPool} = require('@/modules/databasePools');
const main = getPool('main');
const


async function getShopByKeyword(kw) {
    let query = [
        `SELECT 
    COALESCE(shopName, 'sum') AS name, COUNT(*) AS num
FROM
    meituan.meishi_shop_table
WHERE
    shopName LIKE ?
GROUP BY shopName WITH ROLLUP
LIMIT ?;`,[`%${kw}%`,]
    ]


}