const crypto = require('crypto');
const fs = require('fs');
const {keyPath} = require('../config');
const key = fs.readFileSync(keyPath).toString();
exports = module.exports = function (content) {
    let md5 = crypto.createHash('md5');
    md5.update(`${key}${content}`);
    return md5.digest('hex');

}