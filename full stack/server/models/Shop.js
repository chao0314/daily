const {getPool} = require('@/modules/databasePools');
const uuid = require('@/utils/uuid');
const main = getPool('main');
const SIZE = 10;


async function getShopByKeyword(kw, page = 1) {

//     `SELECT
//     coalesce(shopName, '店铺总数'), COUNT(*) AS num
// FROM
//     meituan.meishi_shop_table
// WHERE
//     shopName LIKE ?
// GROUP BY shopName WITH ROLLUP
// LIMIT ?,?;`;
    const query = [
        `SELECT 
    *, COUNT(*) AS num
FROM
    meituan.meishi_shop_table
WHERE
    shopName LIKE ?
GROUP BY shopName WITH ROLLUP
LIMIT ?,?;`,
        [`%${kw}%`, SIZE * (page - 1), SIZE * (page + 1)]
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

async function getShopDetailByID(ID = 'fd24a094de41412382e9932861bd7ab7') {

    const query = [`CALL  get_shop_detail(?)`, [ID]];
    let shop = await main.query(...query);

    let result = {
        ...shop[0][0],
        tags: shop[1],
        groups: shop[2],
        vouchers: shop[3],
        recommends: shop[4],
        comments: shop[5],
        catalogs: []
    };
    result.comments = result.comments.map((comment => {
        comment.desc = comment.desc.toString();
        comment.reply = comment.reply.toString();
        return comment;
    }));

    //todo  catalogs
    let {catalogID, catalogs} = result;
    while (catalogID) {
        const query = [`SELECT * FROM meituan.meishi_catalog_table WHERE ID = ?;`, [catalogID]];
        let catalog = await main.query(...query);
        let {name, url, parentID} = catalog[0];
        catalogID = parentID;
        catalogs.push({name, url});
    }

    result.catalogs.reverse();
    return result;
}

async function insertShop(shop, ownerID) {
    shop.ID = uuid();
    shop.ownerID = ownerID;
    return await main.insert('meishi_shop_table', shop);

}


module.exports = {
    getShopByKeyword,
    getShopDetailByID,
    insertShop
};
