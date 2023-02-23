
const mysql=require('promise-mysql');

(async ()=>{
  //1.连接数据库
  let db=await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'meituan'
  });

  //2.启动事务 所有 SET 都是对一个连接来设置的，所以连接上以后执行一次就行，不需要每个事务都执行。
  await db.query('SET autocommit=0;');

  //、、、
  await db.query('START TRANSACTION;');

  //3.操作
  try{
    await db.query('UPDATE banner_table SET title=? WHERE ID=?', ['12', '396da7aa468c48fe98d44f30115b042f']);
    await db.query('UPDATE banner_tble SET title=? WHERE ID=?', ['15', '396da7aa468c48fe98d44f30115b042f']);

    await db.query('COMMIT;');
  }catch(e){
    await db.query('ROLLBACK;');
  }

  //4.rollback、commit


  console.log('完成');
})();

