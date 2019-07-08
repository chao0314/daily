const path = require("path");
module.exports = function (env = {}) {
    const {dev} = env;
    return {
        mode: dev ? "development" : "production",
        entry: dev ? "./test" : path.resolve(__dirname, "src/index.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: dev ? "test.js" : "axios.min.js",
            libraryTarget: "umd",
            sourceMapFilename: dev ? "test.map" : "axios.min.map"
        },
        devtool: "source-map",
        devServer: {
            port: 8088,
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                }
            ]
        }
    }
};