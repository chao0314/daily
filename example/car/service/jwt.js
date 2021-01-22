const fs = require('fs')
const jwt = require('jsonwebtoken');
const {keyPath} = require('../config');
const key = fs.readFileSync(keyPath);

exports = module.exports = {
    sign(payload = {}, expiresIn = '7d') {
        return jwt.sign(payload, key, {expiresIn});

    },
    verify(token = '') {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, (error, decoded) => {
                if (error) reject(error);
                else resolve(decoded);
            })
        })

    }

}