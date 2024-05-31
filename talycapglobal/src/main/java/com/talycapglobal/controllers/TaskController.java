package com.talycapglobal.controllers;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talycapglobal.entities.Task;
import com.talycapglobal.services.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    // Logger para registrar información sobre las solicitudes y su procesamiento
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    // Contador atómico para llevar un registro seguro de las invocaciones de los métodos del controlador
    private final AtomicLong counter = new AtomicLong(0);

    @Autowired
    private TaskService taskService;

    /**
     * Maneja las solicitudes HTTP GET para obtener una lista de todas las tareas (Tasks).
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        long started = System.currentTimeMillis();
        List<Task> tasks = taskService.getTasks();
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("TaskController#getTasks() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(tasks);
    }


    /**
     * Maneja las solicitudes HTTP GET para obtener una sola tarea (Task).
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable("id") UUID id) {
        long started = System.currentTimeMillis();
        Task task = taskService.getTask(id);
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("TaskController#getTask() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(task);
    }


    /**
     * Maneja las solicitudes HTTP POST para crear una nueva tarea (Task).
     * @param task
     * @return
     */
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        long started = System.currentTimeMillis();
        taskService.createTask(task);
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("TaskController#createTask() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(task);
    }


    /**
     * Maneja las solicitudes HTTP PUT para actualizar una tarea (Task).
     * @param id
     * @param task
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") UUID id, @RequestBody Task task) {
        long started = System.currentTimeMillis();
        taskService.updateTask(task);
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("TaskController#updateTask() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok(task);
    }

    /**
     * Maneja las solicitudes HTTP DELETE para borrar una tarea (Task).
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") UUID id) {
        long started = System.currentTimeMillis();
        taskService.deleteTask(id);
        final Long invocationNumber = counter.getAndIncrement();
        logger.info("TaskController#deleteTask() invocation #{} returning tasks | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started);
        return ResponseEntity.ok().build();
    }
    
}
