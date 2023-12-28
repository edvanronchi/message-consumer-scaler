#!/bin/bash
haproxy -f /usr/local/etc/haproxy/haproxy.cfg >> haproxy.log 2>&1 &
python3 /app/docker-command-api/app.py >> docker-command-api.log 2>&1 &
python3 /app/websocket-producer-docker-stats/app.py >> websocket-producer-docker-stats.log 2>&1 &
python3 /app/websocket-producer-rabbitmq/app.py >> websocket-producer-rabbitmq.log 2>&1 &

tail -f /dev/null