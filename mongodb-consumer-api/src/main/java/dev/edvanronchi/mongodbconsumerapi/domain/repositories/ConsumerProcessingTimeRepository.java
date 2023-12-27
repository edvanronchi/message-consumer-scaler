package dev.edvanronchi.mongodbconsumerapi.domain.repositories;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.ConsumerProcessingTime;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConsumerProcessingTimeRepository extends MongoRepository<ConsumerProcessingTime, Long> {

    List<ConsumerProcessingTime> findByContainerId(String containerId);
}
