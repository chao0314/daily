const http = require('http');
const https = require('https');

module.exports = function (url, data = '', mode = 'https') {
    if (mode === 'https') mode = https;
    else mode = http;
    return new Promise((resolve, reject) => {

        let req = mode.request(url, res => {
            let result = [];
            res.on('data', chunk => result.push(chunk));
            res.on('end', () => {
                resolve(Buffer.concat(result).toString());
            });
            res.on('aborted', (e) => {
                console.log('response abort');
                reject(e);

            })
        });

        req.on('error', e => {
            console.log('request error');
            reject(e);
        });
        req.write(data);
        req.end();

    })


};