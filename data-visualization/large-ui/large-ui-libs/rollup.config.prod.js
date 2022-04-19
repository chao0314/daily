const path = require('path');
// const resolve = require('rollup-plugin-node-resolve');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
// const commonjs = require('rollup-plugin-commonjs');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss');
const vue = require('rollup-plugin-vue');
const {terser} = require('rollup-plugin-terser');


module.exports = {
    input: path.resolve(__dirname, './wordCloud.js'),
    output: [
        {
            file: path.resolve(__dirname, './dist/large-ui.min.js'),
            format: 'umd',
            name: 'large-ui',//umd 需要一个全局变量名,挂在window上
            globals: {
                vue: 'vue'
            }


        },
        {
            file: path.resolve(__dirname, './dist/large-ui.es.min.js'),
            format: 'es',
            globals: {
                vue: 'vue'
            }

        }
    ],

    plugins: [
        resolve(),
        vue(),
        postcss(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            plugins: [
                ['@babel/transform-runtime', {
                    regenerator: true
                }]
            ]

        }),
        json(),
        terser()
    ],
    external: ['vue', 'echarts']

}