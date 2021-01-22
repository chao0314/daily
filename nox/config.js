const path = require('path');
exports = module.exports = {
    entry: path.resolve(__dirname, 'main.js'),
    cluster: {
        enable: true,
        cpus: 2,
        memory: 1024,
        checkMemoryTimeout: 60000,
        reboot: true,
        rebootTimeout: 5000,
        heartbeatCount: 3,
        heartbeatTimeout:5000
    },
    diDir: {},
}