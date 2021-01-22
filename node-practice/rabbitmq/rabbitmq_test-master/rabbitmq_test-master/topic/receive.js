const amqp = require("amqplib");

async function receive() {
  const queueName = "topic_queue";
  const ex = 'ex.topic';
  const bindingKey = "key.#";

  let conn = await amqp.connect('amqp://localhost');
  process.once('SIGINT', function () {
    conn.close();
  });

  let ch = await conn.createChannel();

  await ch.assertExchange(ex, 'topic', { durable: false });
  let ok = await ch.assertQueue(queueName, {
    durable: false,
  });
  ch.prefetch(1);
  await ch.bindQueue(ok.queue, ex, bindingKey);
  await ch.consume(ok.queue, doWork, { noAck: false });

  function doWork(msg) {
    var body = msg.content.toString();
    console.log(" [x] Received '%s'", body);
    var secs = body.split('.').length - 1;
    console.log(" [x] Task takes %d seconds", secs);
    ch.ack(msg);
  }
}

receive();