```
docker-compose up --build -d && \
docker exec -d docker-dind sh -c "haproxy -f /usr/local/etc/haproxy/haproxy.cfg && python3 docker-command-api/app.py"
```