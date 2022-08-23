/*
1.Sequelize基本使用
https://sequelize.org/
*/
/*
2.什么是数据库连接池?
默认情况下有一个人要使用数据库, 那么就必须创建一个连接
默认情况下有一个人不用数据库了, 为了不占用资源, 那么就必须销毁一个连接
但是频繁的创建和销毁连接是非常消耗服务器性能的, 所以为了提升服务器性能就有了连接池

数据库连接池是负责分配、管理和释放数据库连接，
它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个
* */

// 1.导入Sequelize
const Sequelize = require('sequelize');
// 2.配置连接信息
/*
第一个参数: 要操作的数据库名称
第二个参数: 数据库用户名
第三个参数: 数据库密码
第四个参数: 其它的配置信息
* */
const sequelize = new Sequelize('demo', 'root', 'root', {
    host: '127.0.0.1', // MySQL服务器地址
    port: 3306, // MySQL服务器端口号
    // 注意点: Sequelize不仅仅能操作MySQL还能够操作其它类型的数据库
    dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
    pool: {
        max: 5, // 最多有多少个连接
        min: 0, // 最少有多少个连接
        idle: 10000, // 当前连接多久没有操作就断开
        acquire: 30000, // 多久没有获取到连接就断开
    }
});

// 3.测试配置是否正确
sequelize.authenticate()
.then(()=>{
    console.log('ok');
})
.catch((err)=>{
    console.log(err);
});