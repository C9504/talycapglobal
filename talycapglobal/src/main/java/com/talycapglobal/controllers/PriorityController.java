package com.talycapglobal.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talycapglobal.entities.Priority;
import com.talycapglobal.services.PriorityService;

@RestController
@RequestMapping("/priorities")
@CrossOrigin
public class PriorityController {

    /**
     * Logger
     */
    private static final Logger logger = LoggerFactory.getLogger(PriorityController.class);

    /**
     * Contador de invocaciones
     */
    private final AtomicLong counter = new AtomicLong(0);

    /**
     * Servicio de Priorities
     */
    @Autowired
    private PriorityService priorityService;

    /**
     * Maneja las solicitudes HTTP GET para obtener una lista de todos los Priorities.
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Priority>> getPriorities() {
        long started = System.currentTimeMillis();
        List<Priority> priorities = priorityService.getPriorities();
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("PriorityController#getPriorities() invocation #{} returning priorities | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(priorities);
    }


    /**
     * Maneja las solicitudes HTTP POST para crear un nuevo Priority.
     * @param priority
     * @return
     */
    @PostMapping
    public ResponseEntity<Priority> createPriority(@RequestBody Priority priority) {
        long started = System.currentTimeMillis();
        priorityService.creaPriority(priority);
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("PriorityController#createPriority() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(priority);
    }

}
