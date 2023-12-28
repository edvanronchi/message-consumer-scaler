#!/bin/bash
haproxy -f /usr/local/etc/haproxy/haproxy.cfg >> output1.log 2>&1 &
python3 /app/docker-command-api/app.py >> output2.log 2>&1 &
python3 /app/websocket-producer-docker-stats/app.py >> output3.log 2>&1 &
python3 /app/websocket-producer-rabbitmq/app.py >> output4.log 2>&1 &

tail -f /dev/null