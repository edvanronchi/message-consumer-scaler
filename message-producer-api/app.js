const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
const router = express.Router()
const port = 8080;

app.use(express.json());
app.use(cors());

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
    const message = 'Olá, RabbitMQ!';
    channel.publish('ex-message', '', Buffer.from(message));
};

router.post('/producer-message', async (req, res) => {
    try {
        const { messagesPerSecond } = req.body;

        if (!messagesPerSecond || isNaN(messagesPerSecond) || messagesPerSecond <= 0) {
            return res.status(400).json({ error: 'A quantidade de mensagens por segundo deve ser um número maior que zero.' });
        }

        if (!connection || !channel) {
            await connectToRabbitMQ();
            await setupRabbitMQ();
        }

        clearInterval(intervalId);

        intervalId = setInterval(sendMessages, 1000 / messagesPerSecond);

        res.json({ success: true, message: `Enviando ${messagesPerSecond} mensagens por segundo para o RabbitMQ.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao enviar as mensagens.' });
    }
});

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
