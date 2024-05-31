package com.talycapglobal.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talycapglobal.entities.Task;
import com.talycapglobal.repositories.TaskRepository;

@Service
public class TaskService {

    /**
     * Repositorio de tareas
     */
    @Autowired
    TaskRepository taskRepository;

    /**
     * Obtiene todas las tareas
     * @return
     */
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    /**
     * Obtiene una sola tarea
     * @param id
     * @return
     */
    public Task getTask(UUID id) {
        return taskRepository.findById(id).get();
    }

    /**
     * Crea una nueva tarea
     * @param task
     * @return
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Actualiza una tarea
     * @param task
     * @return
     */
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Elimina una tarea
     * @param id
     */
    public void deleteTask(UUID id) {
        taskRepository.deleteById(id);
    }
    
}
