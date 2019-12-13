const {getPool} = require('@/modules/databasePools');
const main = getPool('main');
const uuid = require('@/utils/uuid');
const md5 = require('@/utils/md5');

async function getUserByMobile(mobile) {

    const query = [
        `SELECT 
    *
FROM
    meituan.user_table
WHERE
    mobile = ?;`, [mobile]
    ];

    return await main.query(...query);

}

async function register(mobile, password) {
    const id = uuid();
    password = md5(password);

    const query = [
        `INSERT INTO meituan.user_table (ID,avatar,name,mobile,password) 
            VALUES 
        (?,'avatar.jpg','美团用户',?,?)`, [id, mobile, password]
    ];

    return await main.query(...query);

}

async function login(mobile, password) {
    const query = [
        `SELECT 
    *
FROM
    meituan.user_table
WHERE
    mobile = ?  
AND 
    password = ?;`, [mobile, md5(password)]
    ];


    let rows = await main.query(...query);

    if (rows.length === 0) return {error: true};
    else return {error: false};
}


module.exports = {
    getUserByMobile,
    register,
    login
};