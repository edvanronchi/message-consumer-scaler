const express = require('express');
const amqp = require('amqplib');

const app = express();
const router = express.Router()
const port = 8080;

app.use(express.json());

let intervalId;
let connection;
let channel;

const connectToRabbitMQ = async () => {
    connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    channel = await connection.createChannel();
};

const setupRabbitMQ = async () => {
    const exchangeName = 'ex-message';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
};

const sendMessages = () => {
    const message = 'Hi, RabbitMQ!';
    channel.publish('ex-message', '', Buffer.from(message));
};

router.post('/producer-message', async (req, res) => {
    const { messagesPerSecond } = req.body;

    if (!connection || !channel) {
        await connectToRabbitMQ();
        await setupRabbitMQ();
    }

    clearInterval(intervalId);

    if (messagesPerSecond === 0) {
        return res.json({ success: true, message: `Stopping the message delivery to RabbitMQ`});
    }

    intervalId = setInterval(sendMessages, 1000 / messagesPerSecond);

    res.json({ success: true, message: `Sending ${messagesPerSecond} messages per second to RabbitMQ` });
});

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`API service running on port ${port}`);
});
