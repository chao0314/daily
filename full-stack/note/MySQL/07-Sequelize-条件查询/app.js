
// 1.导入Sequelize
const Sequelize = require('sequelize');

(async ()=>{
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

    // 3.创建模型
    let User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING, // varchar(255)
            allowNull: false,
            unique: true
        },
        age: {
            type: Sequelize.TINYINT,
            defaultValue: 66
        },
        gender: {
            type: Sequelize.ENUM(['男', '女', '妖']),
            defaultValue: '妖'
        }
    }, {
        freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
        // tableName: 'student', // 自定义表名
        timestamps: false, // 不需要自动创建createAt/updateAt这两个字段
        indexes: [ // 指定索引
            {
                name: 'idx_age', // 索引名称
                fields: ['age'], // 索引字段名称
            }
        ]
    });
    // sequelize.sync();

    // 4.查询
    // 4.1查询多条数据
    // let us = await User.findAll();
    // console.log(us);
    // console.log(us.map(u => u.dataValues));

    // 4.2查询指定列数据
    // let us = await User.findAll({
    //     attributes: ['name', 'age']
    // });
    // console.log(us.map(u => u.dataValues));

    // 4.3条件查询
    let us = await User.findAll({
        where: {
            // id: 1
            // age: {
            //     [Sequelize.Op.gte] : 33
            // },
            // id: 7
            [Sequelize.Op.or]: {
                age: 33,
                id: 7
            }
        }
    });
    console.log(us.map(u => u.dataValues));
})();

