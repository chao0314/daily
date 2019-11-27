const {redis: redisConfig} = require('@/config');
const {setPool, getPool} = require('@/modules/redisPools');
const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
//cluster setting
bluebird.promisifyAll(redis.Multi.prototype);


module.exports = async function () {

    for (let rd in redisConfig) {
        if (redisConfig.hasOwnProperty(rd) && !getPool(rd)) {
            let client = await redis.createClient(redisConfig[rd]);
            //await client.setAsync('123_$_321', 'init test');
            //if (await client.getAsync('123_$_321') !== 'init test') throw new Error('init redis failed');
            //client.delAsync('123_$_321');
            setPool(rd, client);
        }
    }

};


