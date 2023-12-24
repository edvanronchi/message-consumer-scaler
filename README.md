# Documentação

## Sobre o projeto

## Técnologias utilizadas
- Java 17
- Maven 3.9.2
- Spring Boot 3.1.3

## Docker
```
docker-compose up --build -d && \
docker exec -d docker-dind sh -c "haproxy -f /usr/local/etc/haproxy/haproxy.cfg" && \
docker exec -d docker-dind sh -c "python3 docker-command-api/app.py" && \
docker exec -d docker-dind sh -c "python3 websocket-producer-docker-stats/app.py" &&\
docker exec -d docker-dind sh -c "python3 websocket-producer-rabbitmq/app.py"
```

## Roadmap
### Fases Concluídas
- [x] Iniciar o Projeto
- [x] Criar Migrations
- [x] Configurar o Ambiente de Desenvolvimento com Docker
- [x] Criar Testes Unitários
- [x] Documentar a API

### Próximas Etapas
- [ ] Implementar Autenticação
- [ ] Implementar Documentação com Swagger
- [ ] Desacoplar Funcionalidades em Microserviços
- [ ] Implementar Ferramentas para Monitoramento e Observabilidade