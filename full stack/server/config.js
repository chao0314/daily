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
            cacheDir: mode === 'dev' ? path.resolve(__dirname, 'cache') : '/usr/share/nginx/html/',
            logDir: path.resolve(__dirname, 'logs/index')
        },
        food: {
            version: '1.0.0',
            enabled: false,
            entry: path.resolve(__dirname, 'apps/food'),
            port: 8081,
            templateDir: path.resolve(__dirname, 'apps/food/template'),
            minifyHtml: false,
            cacheDir: mode === 'dev' ? path.resolve(__dirname, 'cache') : '/usr/share/nginx/html/'
        },
        data: {
            version: '1.0.0',
            enabled: false,
            entry: path.resolve(__dirname, 'apps/data'),
            port: 8082
        },
        api: {
            version: '1.0.0',
            enabled: true,
            entry: path.resolve(__dirname, 'apps/api'),
            port: 8083
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
    webSsr: {
        //首页采用ssr渲染树html骨架，前端页面hydrate配合，再接管绑定事件等，打包到此文件夹。
        index: path.resolve(__dirname, "./web/index")
    },
    webSrc: {
        //首页因为要在浏览器内hydrate接管ssr生成的页面html骨架，所以也要打包一份浏览器版本的react代码。
        index: path.resolve(__dirname, "./web/index"),
        list: path.resolve(__dirname, './web/list'),
        cart: path.resolve(__dirname, './web/cart')
    }
    ,
    webUtils: {
        burying: path.resolve(__dirname, './web_utils/burying')
    }
    ,
    staticServer: [
        //静态文件负载均衡，分发到不同的服务器 nginx
        // 's0.mt.com',
        // 's1.mt.com',
        // 's2.mt.com'
        'localhost:8080'
    ]
}
;