const SentryCliPlugin = require('@sentry/webpack-plugin');
console.log("-----process-----")
module.exports = {
    configureWebpack: config => {
        console.log("process env NODE_ENV---", process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {


            return {
                devtool: "source-map",
                plugins: [
                    new SentryCliPlugin({
                        release: 'v0.0.1',
                        authToken: '5b9a9b86a2dc4366bf7a5c824b493882abec8d17524c43e38acabf7eb908e495',
                        url: 'http://192.168.183.160:9000',
                        org: 'sentry',
                        project: 'vue-test',
                        urlPrefix: '~/',
                        include: './dist',
                        ignore: ['node_modules'],
                    })
                ]


            }

        } else {
            // 为其他环境修改配置...
            return {}
        }
    }
}