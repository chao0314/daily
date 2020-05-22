#! /usr/bin/env node
// show the run context,must!!!
const {program} = require('commander');
const Server = require('../src/Server');

let options = {
    'current work directory': ['-dir, --directory <dirname>', 'cs -dir <dirname>'],
    'set listen port': ['-p, --port <port>', 'cs -p <port>']

}
// program.option('-dir, --directory <dirname>','current work directory');
// program.option('-p, --port <port>','set listen port');

Object.entries(options).forEach(([description, value]) => {
    program.option(value[0], description);
})

program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    Object.values(options).forEach(([, example]) => {
        console.log(example);
    })
})

let argv = program.parse(process.argv);
// console.log('argv', argv);
let {port, directory} = argv;
let config = {
    port: port || 8090,
    cwd: directory || process.cwd()
}
// console.log('config', config);

Server.start(config)

