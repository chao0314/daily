const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {

        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_module/
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', {

                    loader: 'css-loader',
                    options: {
                        esModule: false
                    }
                }


                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}