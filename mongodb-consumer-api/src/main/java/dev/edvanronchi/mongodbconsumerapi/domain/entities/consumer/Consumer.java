package dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "consumers")
public class Consumer {

    private String serviceName;
    private String cpu;
    private String memory;
    private int replicas;
    private int fibonacci;
}
