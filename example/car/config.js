const path = require('path');

exports = module.exports = {
    port: 8088,
    keyPath: path.resolve(__dirname, './.key'),
    staticDir: path.resolve(__dirname, './static'),
    uploadDir: path.resolve(__dirname, './upload'),
    routeWhiteList: ['/login', '/admin/login'],
    store: {
        db: {
            uri: 'mongodb://writer:writer123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/wcar',
            option: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authSource: 'admin',
                replicaSet: 'rs0',
                readPreference: 'secondaryPreferred',
                w: 'majority',
                wtimeout: 15000,
                readConcern: {level: 'majority'},
                j: true
            }

        },
        cache: {}

    }
}


