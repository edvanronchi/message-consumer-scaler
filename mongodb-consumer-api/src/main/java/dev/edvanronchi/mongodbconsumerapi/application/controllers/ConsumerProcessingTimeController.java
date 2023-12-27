package dev.edvanronchi.mongodbconsumerapi.application.controllers;

import dev.edvanronchi.mongodbconsumerapi.application.dtos.ConsumerProcessingTimeDto;
import dev.edvanronchi.mongodbconsumerapi.application.services.ConsumerProcessingTimeService;
import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.ConsumerProcessingTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/consumer-processing-time")
public class ConsumerProcessingTimeController {

    @Autowired
    private ConsumerProcessingTimeService service;

    @GetMapping("/average/{containerId}")
    public ResponseEntity<Float> averageProcessingTime(@PathVariable("containerId") String containerId) {
        float average = service.average(containerId);
        return new ResponseEntity<>(average, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ConsumerProcessingTime> save(@RequestBody ConsumerProcessingTimeDto consumerProcessingTimeDto) {
        ConsumerProcessingTime consumerProcessingTime = service.save(consumerProcessingTimeDto.toEntity());
        return new ResponseEntity<>(consumerProcessingTime, HttpStatus.CREATED);
    }
}
