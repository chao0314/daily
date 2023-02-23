import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/wordCloud.js',
    output: {
        format: 'umd',
        file: './dist/umd/vue.js',
        name: 'Vue',
        sourcemap: true
    },
    plugins: [
        babel({exclude: 'node_modules/**'}),
        process.env.ENV === 'development' ? serve({
            open: true,
            openPage: '/public/index.html',
            port: 3666,
            contentBase: ''
        }) : ''
    ]


}