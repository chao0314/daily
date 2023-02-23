/*
1.如何在Node程序中操作MySQL数据库?
我们都知道操作MySQL数据库就是连接MySQL服务器, 给MySQL服务器发送指令
在NodeJS中我们可以借助第三方库来连接MySQL服务器, 给MySQL服务器发送指令
1.1 mysql驱动库
https://www.npmjs.com/package/mysql
npm install mysql
1.2 mysql2驱动库
https://www.npmjs.com/package/mysql2
npm install mysql


2.由于node第三方库还不支持最新的mysql加密, 所以我们需要修改为旧版本加密方式
2.1、更改加密方式：
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
2.2、更改密码
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
* */
// 1.导入MySQL第三方驱动库
const mysql      = require('mysql2');
// 2.进行连接配置
var connection = mysql.createConnection({
    host     : '127.0.0.1', // MySQL服务器地址
    port     : 3306,
    user     : 'root',  //  MySQL服务用户名
    password : 'root',  //  MySQL服务密码
    database : 'demo'  // 需要操作的那个数据库的名称

});
// 3.连接MySQL服务器
connection.connect();

// 4.给MySQL服务器发送指令
connection.query('select * from stu where id=1', (error, results, fields) => {
    if (error){
        console.log(error);
        return
    }
    console.log(results);
});

// 5.释放连接
connection.end();


