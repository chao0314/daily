const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack() {

        return {
            resolve: {
                fallback: {
                    "crypto": require.resolve("crypto-browserify"),
                    "stream": require.resolve("stream-browserify")
                }
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process': process
                })
            ]
        }
    }

})
