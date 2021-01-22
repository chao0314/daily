const amqp = require('amqplib');

async function send (){
  const q = 'task_queue';
  
  let conn = await amqp.connect('amqp://localhost');
  let ch = await conn.createChannel();
  let num = 0;

  let time = Date.now();
  for (;;){
    let ok = await ch.assertQueue(q, {durable: true});     
    await ch.sendToQueue(q, Buffer.from("Hello World!"), {
      deliveryMode: true,
      expiration: "10000"
    });
  }
  await ch.close();
  await conn.close();
}

send();