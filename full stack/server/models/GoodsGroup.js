const {getPool} = require('@/modules/databasePools');
const main = getPool('main');

async function getByID(ID) {

}

async function insert(goods) {

}

async function search(keyword) {


}

async function queryInID(ID) {
    const query = [`SELECT * FROM meituan.meishi_group_table  where ID in ( ? );`, [`${ID}`]];
    return await main.query(...query);

}

module.exports = {getByID, insert, search, queryInID};
