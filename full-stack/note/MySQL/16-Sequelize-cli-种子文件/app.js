/*
0.什么是种子文件?
Sequelize-CLI中的种子文件是专门用于编写测试数据的
我们知道在Sequelize-CLI中不同的阶段会创建不同的数据库
但是刚创建出来的数据库是没有数据的, 所以为了方便我们在不同的阶段演示和调试
我们可以在种子文件中提前编写测试数据, 以便于我们在不同的阶段中使用

1.创建种子文件
npx  sequelize seed:generate --name xxx

2.执行种子文件
npx sequelize db:seed --seed=[fileName, ...]; // 执行指定文件
npx sequelize db:seed:all // 执行所有种子文件

3.记录种子文件操作记录
"seederStorage": "sequelize"

4.回退到某个时刻
npx sequelize db:seed:undo --seed=[fileName, ...];  // 回退指定种子操作
npx sequelize db:seed:undo:all  // 回退所有
* */