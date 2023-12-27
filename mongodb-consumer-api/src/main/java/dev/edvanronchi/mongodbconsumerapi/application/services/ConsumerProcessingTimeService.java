package dev.edvanronchi.mongodbconsumerapi.application.services;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.ConsumerProcessingTime;
import dev.edvanronchi.mongodbconsumerapi.domain.repositories.ConsumerProcessingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumerProcessingTimeService {

    @Autowired
    private ConsumerProcessingTimeRepository repository;

    public Float average(String containerId) {
        List<ConsumerProcessingTime> consumersProcessingTime = findAll(containerId);
        return (float) consumersProcessingTime.stream()
                .mapToDouble(ConsumerProcessingTime::getProcessingTime)
                .average()
                .orElse(0);
    }

    public ConsumerProcessingTime save(ConsumerProcessingTime consumerProcessingTime) {
        return repository.save(consumerProcessingTime);
    }

    private List<ConsumerProcessingTime> findAll(String containerId) {
        return repository.findByContainerId(containerId);
    }
}
