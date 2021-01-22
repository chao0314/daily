const amqp = require('amqplib');

async function send() {
  let conn = await amqp.connect('amqp://localhost');
  let ch = await conn.createChannel();
  let num = 0;
  const ex = 'ex.topic';
  const routingKey = "key.topic.t";

  await ch.assertExchange(ex, 'topic', { durable: false });
  await ch.publish(ex, routingKey, Buffer.from("Hello World!"));

  await ch.close();
  await conn.close();
}

send();