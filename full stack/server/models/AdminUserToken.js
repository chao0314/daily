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

async function checkToken(token) {

    const query = [`SELECT * FROM meituan.admin_user_token_table WHERE token = ?`, [token]];
    let rows = await main.query(...query);
    if (rows.length === 1) {
        let {token_expires} = rows[0];
        if (token_expires > (Date.now() / 1000)) return rows[0]['username'];
    }

    return false;

}

module.exports = {
    getTokenByName,
    setToken,
    checkToken
};