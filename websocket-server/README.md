# websocket-server

## Sobre o projeto
Responsável por facilitar a comunicação bidirecional em tempo real entre o [scaler-app](../scaler-app/README.md) e os servidores [websocket-producer-docker-stats](../websocket-producer-docker-stats/README.md) e [websocket-producer-rabbitmq](../websocket-producer-rabbitmq/README.md) , é utilizado para transportar dados métricos, como mensagens não consumidas, total de consumidores, mensagens enviadas por produtores, desempenho dos consumidores, e informações para o terminal, como as estatísticas do Docker.

## Tecnologias e Ferramentas Utilizadas
- Node.js 20.10.0
- Socket.io 
- Express