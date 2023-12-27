package dev.edvanronchi.mongodbconsumerapi.application.controllers;

import dev.edvanronchi.mongodbconsumerapi.application.dtos.ConsumerDto;
import dev.edvanronchi.mongodbconsumerapi.application.services.ConsumerService;
import dev.edvanronchi.mongodbconsumerapi.domain.entities.consumer.Consumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/consumer")
public class ConsumerController {

    @Autowired
    private ConsumerService service;

    @GetMapping("/{serviceName}")
    public ResponseEntity<Consumer> findOne(@PathVariable("serviceName") String serviceName) {
        Consumer consumer = service.findOne(serviceName).orElse(null);
        return new ResponseEntity<>(consumer, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Consumer> save(@RequestBody ConsumerDto consumerDto) {
        Consumer consumer = service.save(consumerDto.toEntity());
        return new ResponseEntity<>(consumer, HttpStatus.CREATED);
    }
}
