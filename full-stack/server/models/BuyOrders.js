const {getPool} = require('@/modules/databasePools');
const main = getPool('main');
const {queryInID} = require('./Orders');

async function getOrdersByUserID(userID) {
    const query = [`SELECT * FROM meituan.buy_orders_table WHERE userID = ? ;`, [userID]];
    let rows = await main.query(...query);
    let collection = {};
    let result = [];
    if (rows.length > 0) {
        rows.forEach(row => {
            let {orderType, orderID} = row;
            if (!collection[orderType]) collection[orderType] = [];
            collection[orderType].push(orderID);
        });

        for (let key of Object.keys(collection)) {
            result.push(await queryInID(collection[key], key));
        }

    }
    return result;

}

module.exports = {
    getOrdersByUserID
};