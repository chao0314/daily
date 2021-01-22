var amqp = require('amqplib');

let ch = null;

function fib(n) {
  var a = 0, b = 1;
  for (var i = 0; i < n; i++) {
    var c = a + b;
    a = b; b = c;
  }
  return a;
}


async function server() {
  const queueName = 'rpc_queue';
  const conn = await amqp.connect('amqp://localhost');
  process.once('SIGINT', function () { conn.close(); });

  ch = await conn.createChannel();
  const ok = await ch.assertQueue(queueName, { durable: false });
  ch.prefetch(1);

  await ch.consume(queueName, reply);
}

function reply(msg) {
  const n = parseInt(msg.content.toString());
  console.log(' [.] fib(%d)', n);
  var response = fib(n);
  ch.sendToQueue(msg.properties.replyTo,
    Buffer.from(response.toString()),
    { correlationId: msg.properties.correlationId });
  ch.ack(msg);
}

server();