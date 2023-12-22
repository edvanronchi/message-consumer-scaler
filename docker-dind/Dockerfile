FROM docker:24.0.7-dind

RUN apk add python3 py3-pip haproxy
RUN pip3 install flask requests pyyaml docker asyncio 'python-socketio[asyncio_client]' --break-system-packages

USER root

WORKDIR /app

COPY docker-command-api /app/docker-command-api
COPY websocket-client /app/websocket-client
COPY message-consumer-worker /app/message-consumer-worker
COPY haproxy/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg