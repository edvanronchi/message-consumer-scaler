const amqp = require('amqplib');
const process = require('process');

const fibonacci = process.env.FIBONACCI || 40;

function processFibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return processFibonacci(n - 1) + processFibonacci(n - 2);
    }
}

async function consumer() {
    const urlDockerDind = 'amqp://guest:guest@172.17.0.1:5672';

    const connection = await amqp.connect(urlDockerDind);
    const channel = await connection.createChannel();

    const exchangeName = 'ex-message';
    const queueName = 'queue-message';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchangeName, '');

    await channel.prefetch(1);

    console.log(`Waiting for messages from the exchange ${exchangeName} in the queue ${queueName}`);

    channel.consume(queueName, (msg) => {
        if (!msg.content) {
           return;
        }

        const start = performance.now();
        console.log(`Message received: ${msg.content.toString()}`);
        console.log('Fibonaci: ' + fibonacci);
        console.log('Result: ' + processFibonacci(fibonacci));
        const end = performance.now();

        console.log('Time to process: ' + (end - start) + 'ms');

        channel.ack(msg);
    }, { noAck: false });
}

consumer();
