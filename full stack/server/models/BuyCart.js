const {getPool} = require('@/modules/databasePools');
const main = getPool('main');
const {queryInID} = require('./Goods');

async function getListByUserID(userID) {
    const query = [`SELECT * FROM meituan.buy_cart_table WHERE userID = ? ;`, [userID]];
    let rows = await main.query(...query);
    let collection = {};
    let result = [];
    if (rows.length > 0) {
        rows.forEach(row => {
            let {goodsType, goodsID} = row;
            if (!collection[goodsType]) collection[goodsType] = [];
            collection[goodsType].push(goodsID);
        });

        for (let key of Object.keys(collection)) {
            result.push(await queryInID(collection[key], key));
        }

    }
    return result;

}

module.exports = {
    getListByUserID
};