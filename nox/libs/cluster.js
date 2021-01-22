const cluster = require('cluster');
const os = require('os');
const config = require('@/config');
let {
    entry, cluster: {
        enable = true,
        cpus = 2,
        memory = 1024,
        checkMemoryTimeout = 60000,
        reboot = true,
        rebootTimeout = 5000,
        heartbeatCount = 3,
        heartbeatTimeout = 5000
    }
} = config;

/*
* exit code:
*
* 0: 正常退出
* 1：主动重启
* 2：未捕获异常
* 3：内存异常
*
* 退出后默认均会重启
* */
// single process mode
if (!enable) return require(entry);

if (cluster.isMaster) {
    let osCpus = os.cpus().length;
    if (cpus) cpus = cpus > osCpus ? osCpus : cpus;
    else cpus = osCpus / 2;
    for (let i = 0; i < cpus; i++) {
        forkProcess(cluster);
    }

    cluster.on('exit', (worker, code) => {

        console.log('worker exit,pid is:', worker.process.pid, 'code is:', code);
        //退出重启，定时,避免死机
        if (code > 0 && reboot) setTimeout(() => forkProcess(cluster), rebootTimeout);
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
        if (process.memoryUsage().rss > memory * 1024 * 1024) process.exit(3);
    }, checkMemoryTimeout)


    require(entry);

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
        if (count >= heartbeatCount) {
            console.log(`kill dead process ,${worker.process.pid}`);
            //code should be 1
            process.kill(worker.process.pid);


        } else {
            count++;
            worker.send('heartbeat detection')
        }

    }, heartbeatTimeout)

}





