const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const key =  fs.readFileSync(path.resolve(__dirname, '../keys.txt')).toString();

function md5(data) {
    let md5 = crypto.createHash('md5');
    md5.update(data);
    return md5.digest('hex');

}


module.exports = function (data) {
    return md5(`${data}${key}`);
};


