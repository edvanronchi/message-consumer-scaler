package dev.edvanronchi.mongodbconsumerapi.domain.repositories;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.Consumer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConsumerRepository extends MongoRepository<Consumer, Long> {

    Optional<Consumer> findByServiceName(String containerId);
}
