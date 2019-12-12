const {getPool} = require('@/modules/databasePools');
const main = getPool('main');
const SIZE = 10;


async function getShopByKeyword(kw, page = 1) {
    const query = [
        `SELECT 
    *, COUNT(*) AS num
FROM
    meituan.meishi_shop_table
WHERE
    shopName LIKE ?
GROUP BY shopName WITH ROLLUP
LIMIT ?,?;`,
        [`%${kw}%`, SIZE * (page - 1), SIZE * page + 1]
    ];
    let result = {
        shops: [],
        total: 0
    };
    if (kw) {
        let rows = await main.query(...query);
        if (rows.length > 0) {
            rows.forEach((v) => {
                if (!v.shopName) result.total = v.num;
                else result.shops.push(v);
            })
        }
    }

    return result;

}


module.exports = {
    getShopByKeyword
};
