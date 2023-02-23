#!/usr/bin/env node

// ↑ hash bang 需放在起始位，bin字段告诉系统，运行 test-cli 时，去哪里找入口文件，上面语句告诉系统
//用什么环境执行入口文件

const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'select project',
        message: 'please select project type',
        choices: [
            {
                name: 'vue',
                value: 'vue',
                short: 'vue3.0 will be used'
            },
            {
                name: 'react',
                value: 'react',
                short: 'react18 will be used'
            }
        ]

    }
]
inquirer.prompt(questions).then(answers=>console.log(answers))