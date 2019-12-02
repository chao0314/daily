const path = require('path');
const {webSrc} = require('./config');
module.exports = [
    {
        mode: 'development',
        entry: webSrc,
        target: 'node',
        output: {
            libraryTarget: 'commonjs2',
            path: path.resolve(__dirname, 'web_server_dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }

                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, './web')
            }
        }
    },
    {
        mode: 'development',
        entry: webSrc,
        output: {
            path: path.resolve(__dirname, 'static'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, './web')
            }
        },
        devtool: 'source-map'
    }

];