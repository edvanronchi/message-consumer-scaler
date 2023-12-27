package dev.edvanronchi.mongodbconsumerapi.application.dtos;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.Consumer;

public record ConsumerDto(String serviceName, String cpu, String memory, int replicas, int fibonacci) {
    public Consumer toEntity() {
        Consumer consumer = new Consumer();
        consumer.setServiceName(serviceName);
        consumer.setCpu(cpu);
        consumer.setMemory(memory);
        consumer.setReplicas(replicas);
        consumer.setFibonacci(fibonacci);
        return consumer;
    }
}
