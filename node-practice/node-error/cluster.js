const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {

    for (let i = 0; i < os.cpus().length / 2; i++) {
        forkProcess(cluster);

    }

    cluster.on('exit', (worker, code) => {

        console.log('worker exit,pid is:', worker.process.pid, 'code is:', code);
        //退出重启，定时,避免死机
        if (code > 0) setTimeout(() => forkProcess(cluster), 5000);
    })

} else {

    process.on('message', msg => {
        if (msg === 'heartbeat detection') process.send('detection successful');
    })

    // 当前进程有未捕获的 error

    process.on('uncaughtException', error => {

        console.log(error);
        process.exit(2);
    })

    //检查工作进程的 常驻内存 超过 xM 退出。
    setInterval(() => {
        if (process.memoryUsage().rss > 30 * 1024 * 1024) process.exit(3);
    }, 10000)


    require('./app');

}

function forkProcess(cluster) {
    let worker = cluster.fork();
    let timer = null;
    let count = 0;

    worker.on('exit', code => {
        console.log('process exit,code is', code);
        timer && clearInterval(timer);
    })

    //心跳检测 超过三次 没有回应 ，退出。
    worker.on('message', msg => {

        if (msg === 'detection successful') count--;

    })


    timer = setInterval(() => {
        if (count >= 3) {
            process.kill(worker.process.pid);

        } else {
            count++;
            worker.send('heartbeat detection')
        }

    }, 3000)

}



