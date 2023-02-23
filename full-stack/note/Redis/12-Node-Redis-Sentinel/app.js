// 1.导入redis-sentinel
const sentinel = require('redis-sentinel');

// 2.告诉redis-sentinel有哪些sentinel节点
var endpoints = [
    {host: '127.0.0.1', port: 26380},
    {host: '127.0.0.1', port: 26381},
    {host: '127.0.0.1', port: 26382},
];
// 3.填写一些额外的配置
var opts = {}; // Standard node_redis client options
// 4.告诉redis-sentinel主节点的名称是什么
var masterName = 'mymaster';

// 5.连接redis-sentinel
var redisClient = sentinel.createClient(endpoints, masterName, opts);

// 6.通过redis-sentinel的连接对象操作Redis
redisClient.set('gender', 'man');
redisClient.get('gender', (err, val)=>{
    console.log(val);
});