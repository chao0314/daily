const {getPool} = require('@/modules/databasePools');
const main = getPool('main');


async function getAdminUserByName(username) {
    const query = [`SELECT * FROM meituan.admin_user_table WHERE username = ? ;`, [username]];
    return await main.query(...query);
}

async function insertAdminUser(username, password, parent = 0, role = 0) {

    // const query = [`INSERT INTO admin_user_table (username,password,parent) VALUES (?,?,?)`, [username, password, parent]];
    const query = [`CALL create_admin_user(?,?,?,?)`, [username, password, parent, role]];
    return await main.query(...query);

}

async function createTeamUser(username, password, parent, role = 1) {

    return await insertAdminUser(username, password, parent, role);
}


async function getAuthorityByID(id) {
    const query = [`SELECT 
    *
FROM
    meituan.role_table AS role
WHERE
    role.ID IN (SELECT 
            role
        FROM
            meituan.admin_role_table
        WHERE
            userid = ?)
ORDER BY role.ID`, [id]];

    let rows = await main.query(...query);
    let authority = {};
    rows.forEach(item => {
        for (let key in item) {
            if (item.hasOwnProperty(key) && key !== 'ID') {
                if (key !== 'title') {
                    let byte = Buffer.from(item[key])[0];
                    let c = (1 & byte) > 0 ? 1 : 0;
                    let r = (2 & byte) > 0 ? 1 : 0;
                    let u = (4 & byte) > 0 ? 1 : 0;
                    let d = (8 & byte) > 0 ? 1 : 0;
                    if (c || r || u || d) {
                        if (!authority[key]) authority[key] = {};
                        if (!authority[key].c) authority[key].c = c;
                        if (!authority[key].r) authority[key].r = r;
                        if (!authority[key].u) authority[key].u = u;
                        if (!authority[key].d) authority[key].d = d;
                    }

                } else {
                    if (!authority[key]) authority[key] = [];
                    authority[key].push(item[key]);
                }
            }

        }

    });
    console.log(authority);
    return authority;
}

module.exports = {
    getAdminUserByName,
    insertAdminUser,
    getAuthorityByID
};