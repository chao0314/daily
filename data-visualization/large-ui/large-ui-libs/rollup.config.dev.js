const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss');
const vue = require('rollup-plugin-vue');


module.exports = {
    input: path.resolve(__dirname, './index.js'),
    output: [
        {
            file: path.resolve(__dirname, './dist/large-ui.js'),
            format: 'umd',
            name: 'large-ui',//umd 需要一个全局变量名,挂在window上
            globals: {
                vue: 'vue'
            }


        },
        {
            file: path.resolve(__dirname, './dist/large-ui.es.js'),
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
            exclude: 'node_modules/**'
        }),
        json(),


    ],
    external: ['vue', 'echarts']

}