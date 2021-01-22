const Admin = require('../model/admin');
const jwt = require('./jwt');
const md5 = require('../utils/md5');

async function adminLogin({username, password}) {
    password = md5(password);
    let user = await Admin.find({username, password});
    console.log("user",user);
    if (user.length === 1) return jwt.sign({username}, '12h');
    else return null;

}

exports = module.exports = {
    adminLogin
}
