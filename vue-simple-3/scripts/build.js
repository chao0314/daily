// 把package 目录下的所有包都进行打包


const fs = require('fs');
const execa = require('execa'); // 开启子进程 进行打包， 最终还是使用rollup来进行打包


const targets = fs.readdirSync('packages').filter(f => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
        return false;
    }
    return true;
})

// 对目标进行依次打包 ，并行打包

async function build(target) { // rollup  -c --environment TARGET:shated
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {stdio: 'inherit'}); // 当子进程打包的信息共享给父进程
}

function runParallel(targets, build) {
    const res = []
    for (const item of targets) {
        const p = build(item)
        res.push(p);
    }
    return Promise.all(res)
}


runParallel(targets, build).then(res => console.log('build success')).catch(e => console.log('build error', e));