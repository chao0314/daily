const path = require('path');

exports = module.exports = {
    port: 8088,
    staticDir: path.resolve(__dirname, './static'),
    uploadDir: path.resolve(__dirname, './upload'),
}


