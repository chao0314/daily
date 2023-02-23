/*
1.创建模型
npx sequelize model:generate --name xxx --attributes key:type

2.根据模型创建表
npx sequelize db:migrate

3.回退到某个时刻
npx sequelize db:migrate:undo  // 回退到上一个版本
npx sequelize db:migrate:undo:all // 回退所有
npx sequelize db:migrate:undo --name=20200329045955-create-book.js // 回退指定操作
* */