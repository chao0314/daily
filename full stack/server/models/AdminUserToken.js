const {getPool} = require('@/modules/databasePools');
const main = getPool('main');

async function getTokenByName(username) {
    const query = [`SELECT * FROM meituan.admin_user_token_table WHERE username = ?;`, [username]];
    return await main.query(...query);
}

async function setToken(username, token = '', token_expires = 0) {
    const query = [`UPDATE meituan.admin_user_token_table SET token = ? ,token_expires = ? WHERE username = ?;`, [token, token_expires, username]];
    return await main.query(...query);
}

module.exports = {
    getTokenByName,
    setToken
};