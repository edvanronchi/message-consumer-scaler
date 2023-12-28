# websocket-producer-rabbitmq

## Sobre o projeto
A aplicação é responsável por enviar informações do RabbitMQ por meio de WebSocket. Periodicamente, ela realiza requisições ao Prometheus para obter dados essenciais, como a quantidade de mensagens não consumidas, o número de consumers ativos e a taxa de envio de mensagens por segundo.

## Tecnologias e Ferramentas Utilizadas
- Python 3.13
- Socket.io
- Asyncio