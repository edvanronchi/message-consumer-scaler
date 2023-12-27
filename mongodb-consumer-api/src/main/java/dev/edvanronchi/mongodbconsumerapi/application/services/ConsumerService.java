package dev.edvanronchi.mongodbconsumerapi.application.services;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.Consumer;
import dev.edvanronchi.mongodbconsumerapi.domain.repositories.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConsumerService {

    @Autowired
    private ConsumerRepository repository;

    public Optional<Consumer> findOne(String serviceName) {
        return repository.findByServiceName(serviceName);
    }

    public Consumer save(Consumer consumer) {
        return repository.save(consumer);
    }
}
