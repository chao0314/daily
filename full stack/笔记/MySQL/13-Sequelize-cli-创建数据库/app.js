/*
1.什么是Sequelize-CLI?
- 在编程开发中为了能够更好的管理代码, 我们可以使用Git来管理我们的代码,
  实现对代码变更的追踪, 实现在各个不同版本之间切换
- 在数据库开发中为了能够更好的管理数据库, 我们也可以使用数据库迁移工具来管理我们的数据库,
  实现对数据库变更的追踪, 实现在各个不同版本之间切换
- Sequelize-CLI就是一款数据库迁移工具, 能够让我们追踪数据库的变更, 在各个不同版本之间随意切换

2.如何使用Sequelize-CLI?
npm i sequelize sequelize-cli mysql2 -s
npx sequelize --help

3.初始化Sequelize-CLI
npx sequelize init
- config: 数据库配置文件, 用于告诉CLI如何连接数据库
- models: 数据库模型文件, 用于告诉CLI如何创建表
- migrations: 数据库迁移文件, 用于记录数据库不同版本变更
- seeders: 数据库种子文件, 用于编写测试数据

npx sequelize db:create

// 修改环境变量
set NODE_ENV=test
* */