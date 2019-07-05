const path = require("path");
module.exports = function (env = {}) {
    const {dev} = env;
    return {
        mode: dev ? "development" : "production",
        entry: path.resolve(__dirname, "src/index.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: dev ? "nox.js" : "nox.min.js",
            libraryTarget: "umd",
            sourceMapFilename: dev ? "nox.map" : "nox.min.map"
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