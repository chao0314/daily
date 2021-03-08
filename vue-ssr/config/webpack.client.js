const path = require('path');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {

    entry: {
        client: path.resolve(__dirname, '../src/client-entry.js')
    },
    plugins: [

        new HtmlWebpackPlugin({
            //其实这里不太需要的编译一份前端 html,因为ssr 用的是后端拿份 html
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'client.html'
        })
    ]

})