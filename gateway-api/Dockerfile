FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/gateway-api-*.jar /app/

RUN echo '#!/bin/sh' > /app/run.sh && \
    echo 'java -jar /app/gateway-api-*.jar' >> /app/run.sh && \
    chmod +x /app/run.sh

CMD ["/app/run.sh"]