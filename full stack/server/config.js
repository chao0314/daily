const path = require('path');
const mode = process._argv ? process._argv.env : "dev";
module.exports = {
    apps: {
        index: {
            version: '1.0.0',
            enabled: true,
            entry: path.resolve(__dirname, 'apps/index'),
            port: 8080,
            templateDir: path.resolve(__dirname, 'apps/index/template'),
            minifyHtml: false,
            cacheDir: mode === 'dev' ? path.resolve(__dirname, 'cache') : '/usr/share/nginx/html/'
        },
        food: {
            version: '1.0.0',
            enabled: true,
            entry: path.resolve(__dirname, 'apps/food'),
            port: 8081,
            templateDir: path.resolve(__dirname, 'apps/food/template'),
            minifyHtml: false,
            cacheDir: mode === 'dev' ? path.resolve(__dirname, 'cache') : '/usr/share/nginx/html/'
        }
    },
    databases: {
        main: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'meituan'
        }
    },
    redis: {
        main: {
            host: 'localhost',
            port: '6379',
            password: void 0
        }
    },
    webSrc: {
        index: path.resolve(__dirname, "./web/index")
    },
    staticServer: [
        // 's0.mt.com',
        // 's1.mt.com',
        // 's2.mt.com'
        'localhost:8080'
    ]
};