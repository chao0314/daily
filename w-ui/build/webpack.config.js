// umd bundle
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');
module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "../packages/w-ui/index.ts"),
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "index.umd.js",
        libraryTarget: "umd",
        library: 'w-ui'
    },
    externals: { // 排除 依赖的 vue不打包，使用组件库的用户，自行安装 vue
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
        },
    },
    module: {
        rules: [

            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ",jsx", ".json", ".vue"]
    },
    plugins: [new VueLoaderPlugin()]


}