const amqp = require('amqplib');

function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

async function consumer() {
    try {
        const connection = await amqp.connect('amqp://guest:guest@172.17.0.1:5672');
        const channel = await connection.createChannel();

        const exchangeName = 'ex-message';
        const queueName = 'queue-message';

        await channel.assertExchange(exchangeName, 'direct', { durable: true });

        await channel.assertQueue(queueName, { durable: true });

        await channel.bindQueue(queueName, exchangeName, '');

        console.log(`Aguardando mensagens da exchange ${exchangeName} na fila ${queueName}`);

        channel.consume(queueName, (msg) => {
            if (msg.content) {
                console.log(fibonacci(1));
                console.log(`Mensagem recebida: ${msg.content.toString()}`);
            }
        }, { noAck: true });
    } catch (error) {
        console.error(error);
    }
}

consumer();
