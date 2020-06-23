module.exports = {
    mode: 'development',
    devtool: false,
    entry: __dirname + '/app.jsx',
    output: {
        filename: 'main.js',
        path: __dirname + '../../../public/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}