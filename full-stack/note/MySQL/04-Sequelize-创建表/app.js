
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

/*
1.字段说明常用属性
type:  字段类型
primaryKey: 是否是主键
autoIncrement: 是否自动增长
allowNull: 是否允许为空
unique: 是否必须唯一
defaultValue:  默认值
* */
/*
2.额外配置常用属性
timestamps: 是否自动添加createdAt/updateAt字段
freezeTableName: 是否禁止自动将表名修改为复用
tableName:  是否自定义表名
indexes: [ // 指定索引
    {
        name: '', // 索引名称
        fields: [''], // 索引字段名称
    }
]
* */

/*
第一个参数: 用于指定表的名称
第二个参数: 用于指定表中有哪些字段
第三个参数: 用于配置表的一些额外信息
* */
/*
注意点:
1.sequelize在根据模型创建表的时候, 会自动将我们指定的表的名称变成复数
2.sequelize在根据模型创建表的时候, 会自动增加两个字段 createAt/updateAt
* */
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

// 注意点: 默认定义好一个模型之后并不会自动创建对应的表
//         我们需要通过调用连接对象的sync方法来执行同步
//         只有同步之后才会自动根据模型创建对应的表
sequelize.sync();