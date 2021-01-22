const readline = require('readline');


const def = {
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
}
let rl;
exports = module.exports = {

    start(options = {}) {
        options = Object.assign({}, def, options);
        rl = readline.createInterface(options);
        rl.on('SIGINT', () => {
            console.log('退出');
            rl.close();
            process.exit(0)
        })
        return rl;
    },
    ask(content) {
        return new Promise(resolve => {
            rl.question(content, answer => resolve(answer));

        })
    },
    close() {
        rl.close();
    }

}