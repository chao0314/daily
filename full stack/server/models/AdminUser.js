const {getPool} = require('@/modules/databasePools');
const main = getPool('main');


async function getAdminUserByName(username) {
    const query = [`SELECT * FROM meituan.admin_user_table WHERE username = ? ;`, [username]];
    return await main.query(...query);
}

async function insertAdminUser(username, password, parent = 0) {

    // const query = [`INSERT INTO admin_user_table (username,password,parent) VALUES (?,?,?)`, [username, password, parent]];
    const query = [`CALL create_admin_user(?,?,?)`, [username, password, parent]];
    return await main.query(...query);

}

module.exports = {
    getAdminUserByName,
    insertAdminUser
};