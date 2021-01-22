var amqp = require('amqplib');
var basename = require('path').basename;
var Promise = require('bluebird');
var uuid = require('uuid');

let conn = null;
let ch = null;
async function client() {
  const n = 100;
  const queueName = "rpc_queue";
  const queueNameTest = "rpc_queue_test";

  conn = await amqp.connect('amqp://localhost');
  ch = await conn.createChannel();

  const corrId = uuid();
  let ok = await ch.assertQueue(queueNameTest, { exclusive: true });
  ch.prefetch(1);
  await ch.consume(ok.queue, maybeAnswer, { noAck: true })

  await ch.sendToQueue(queueName, Buffer.from(n.toString()), {
    correlationId: corrId, replyTo: ok.queue
  });

  function maybeAnswer(msg) {
    if (msg.properties.correlationId === corrId) {
      console.log(msg.content.toString());
    } else {
      console.log("error")
    }
    ch.close();
    conn.close();
  }
}

client();
