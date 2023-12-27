FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/mongodb-consumer-api-*.jar /app/

RUN echo '#!/bin/sh' > /app/run.sh && \
    echo 'java -jar /app/mongodb-consumer-api-*.jar' >> /app/run.sh && \
    chmod +x /app/run.sh

CMD ["/app/run.sh"]