require('module-alias/register');
const minimist = require('minimist');
process._argv = minimist(process.argv);
const mode = process._argv.env;
const cluster = require('cluster');
const createServer = require('@/libs/createServer');
const path = require('path');
const fs = require('fs');
const {apps} = require('@/config');
if (cluster.isMaster) {

    setInterval(() => {

        for (let app in apps) {
            if (apps.hasOwnProperty(app)) {
                let appConfig = apps[app];
                if (appConfig.enabled && !appConfig.worker) {
                    forkProcess(appConfig);
                } else {
                    let {apps: curApps} = mRequire(path.resolve(__dirname, "config.js"));
                    let curConfig = curApps[app];
                    if (curConfig.enabled) {
                        if (!appConfig.enabled) {
                            forkProcess(curConfig);
                        } else if (appConfig.version !== curConfig.version) {
                            forkProcess(curConfig);
                            if (appConfig.worker) appConfig.worker.send('close process');
                        } else {
                            curConfig.worker = appConfig.worker;
                        }
                    } else {
                        if (appConfig.worker) appConfig.worker.send('close process');
                    }
                    apps[app] = curConfig;
                }
            }
        }

    }, 3000)


} else {
    let server;
    process.on("message", async config => {
        if (config === 'close process') {
            server.close(() => {
                console.log('previous process closed');
                process.exit(0);

            });
        } else {
            server = await createServer(config);
            console.log('init process', config.port);

            // setTimeout(() => {
            //     if (config.port === 8081) console.log(bbb);
            // }, 4000)

        }
    });


}

function forkProcess(config) {
    console.log("fork process", config.port);
    let worker = cluster.fork();
    worker.on('exit', code => {
        if (code > 0) {
            setTimeout(() => {
                forkProcess(config)
            }, 3000);
        }
    });
    worker.send(config);
    config.worker = worker;
    return worker;
}

function mRequire(path) {
    let content = fs.readFileSync(path, 'utf8');
    let module = {};
    eval(content);
    return module.exports;
}