const amqp = require("amqplib");

async function receive() {
  const queueName = "task_queue";
  
  let conn = await amqp.connect('amqp://localhost');
  process.once('SIGINT', function()
   { conn.close(); });
  
  let ch = await conn.createChannel();
  let ok = await ch.assertQueue(queueName, {
    durable: true
  });    
  ch.prefetch(1);
  await ch.consume(queueName, doWork, {noAck: false});  

  function doWork(msg) {
    var body = msg.content.toString();
    console.log(" [x] Received '%s'", body);
    var secs = body.split('.').length - 1;
    console.log(" [x] Task takes %d seconds", secs);
    ch.ack(msg);
  }   
}


receive();