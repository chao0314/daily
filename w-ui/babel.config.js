//此处 babel 配置 为全局公用的

module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    plugins: ["@babel/transform-runtime"],
    overrides: [
        {
            test: /\.vue$/,
            plugins: [
                "@babel/transform-typescript"
            ]

        }


    ]


}


