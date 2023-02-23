// 1.导入ioredis
const Redis = require("ioredis");
// 2.告诉ioredis我们有哪些分片服务器
let cluster = new Redis.Cluster([
    {
        port: 7000,
        host: "127.0.0.1",
    },
    {
        port: 7001,
        host: "127.0.0.1",
    },
    {
        port: 7002,
        host: "127.0.0.1",
    }
]);
// 3.通过cluster连接对象来操作Redis
cluster.set('name', 'lnj');
cluster.get('name', (err, val)=>{
    if(!err){
        console.log(val);
    }
});