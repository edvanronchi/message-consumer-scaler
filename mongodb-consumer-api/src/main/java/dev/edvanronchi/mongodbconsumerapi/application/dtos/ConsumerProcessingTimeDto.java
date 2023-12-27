package dev.edvanronchi.mongodbconsumerapi.application.dtos;

import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.ConsumerProcessingTime;

public record ConsumerProcessingTimeDto(String containerId, Float processingTime) {
    public ConsumerProcessingTime toEntity() {
        ConsumerProcessingTime consumerProcessingTime = new ConsumerProcessingTime();
        consumerProcessingTime.setContainerId(containerId);
        consumerProcessingTime.setProcessingTime(processingTime);
        return consumerProcessingTime;
    }
}
