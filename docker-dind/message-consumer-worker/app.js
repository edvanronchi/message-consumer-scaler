const axios = require('axios');
const amqp = require('amqplib');
const process = require('process');

const fibonacci = process.env.FIBONACCI || 1;
const containerId = process.env.HOSTNAME || 'ID';
const urlMongoApi = 'http://172.17.0.1:8091';
const urlDockerDind = 'amqp://guest:guest@172.17.0.1:5672';

const maximumAmountSave = 10;
let amountSave = 0;

function calculateFibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

function saveConsumerProcessingTime(processingTime) {
    if (amountSave === maximumAmountSave) {
        return;
    }

    axios.post(urlMongoApi + '/consumer-processing-time', {
        containerId: containerId,
        processingTime: processingTime
    });

    amountSave++;
}

async function consumer() {
    const exchangeName = 'ex-message';
    const queueName = 'queue-message';

    const connection = await amqp.connect(urlDockerDind);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, '');
    await channel.prefetch(1);

    console.log(`Waiting for messages from the exchange ${exchangeName} in the queue ${queueName}`);

    channel.consume(queueName, (msg) => {
        const start = performance.now();

        if (!msg.content) {
           return;
        }

        console.log(`Message received: ${msg.content.toString()}`);
        console.log(`Fibonaci: ${fibonacci}`);
        console.log(`Result: ${calculateFibonacci(fibonacci)}`);

        channel.ack(msg);

        const end = performance.now();
        const processingTime = end - start;
        saveConsumerProcessingTime(processingTime);
        console.log(`Time to process: ${processingTime} ms`);
    }, { noAck: false });
}

consumer();
