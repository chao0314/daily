// 1.导入Redis库
const redis = require("redis");
// 2.利用这个库连接到Redis服务器
const client = redis.createClient('6379', '127.0.0.1');
// 3.监听连接成功还是失败
client.on("error", function(error) {
    console.error(error);
});
// 4.通过连接对象操作Redis
// client.set('name', 'lnj', redis.print);
// client.get('name', (err, val)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(val);
// });

client.hset('user', ['name', 'zs'], redis.print);
client.hget('user', 'name', (err, val)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(val);
});