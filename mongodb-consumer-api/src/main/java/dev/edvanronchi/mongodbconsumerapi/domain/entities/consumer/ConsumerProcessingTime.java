package dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "consumers_processing_time")
public class ConsumerProcessingTime {

    private String containerId;
    private Float processingTime;
}
