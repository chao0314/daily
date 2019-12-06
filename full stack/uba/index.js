const bluebird = require('bluebird');
const redis = require('redis');
const fs = require('fs');
const path = require('path');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const threshold = 30;
(async () => {
    const main = await redis.createClient({
        host: 'localhost',
        port: '6379',
        password: void 0
    });
    const filepath = path.resolve(__dirname, '../server/logs/index/access.log');

    setInterval(async () => {
        try {
            let oRes = {};
            let aLog = fs.readFileSync(filepath).toString().split('\n').map(v => {
                console.log(v);
                try {
                    return JSON.parse(v);
                } catch (e) {
                    console.log(e);
                    return null
                }
            }).filter(v => v).forEach(v => {
                let {ip, time} = v;
                if (oRes[ip]) {
                    oRes[ip].count++;
                    oRes[ip].min_t = Math.min(time, oRes[ip].min_t);
                    oRes[ip].max_t = Math.max(time, oRes[ip].max_t);
                } else {
                    oRes[ip] = {
                        count: 1,
                        min_t: time,
                        max_t: time
                    }
                }

            });

            for (let ip in oRes) {
                if (oRes.hasOwnProperty(ip)) {
                    let {count, min_t, max_t} = oRes[ip];
                    if (min_t === max_t) continue;
                    if (count * 1000 / (max_t - min_t) >= threshold) {
                        console.log("异常访问 ip :", ip);
                        await main.psetextAsync(`_black_list_${ip}`, 15 * 60 * 1000, ip);
                    }

                }
            }


        } catch (e) {
            console.log(e)
        }


    }, 30000);
})();