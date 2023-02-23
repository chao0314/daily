const path = require("path");
const strip = require("strip-loader");
module.exports = function (env = {}) {
    const {dev} = env;
    return {
        mode: dev ? "development" : "production",
        entry: dev ? ["@babel/polyfill", "./test"] : ["@babel/polyfill", "src/wordCloud.js"],
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
                    exclude: dev ? /node_modules/ : "",
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    },
                        ...dev ? [] : [{
                            loader: strip.loader("console.log")
                        }]]
                }
            ]
        }
    }
};