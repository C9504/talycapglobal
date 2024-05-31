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

import com.talycapglobal.entities.Statu;
import com.talycapglobal.services.StatuService;

@RestController
@RequestMapping("/status")
@CrossOrigin
public class StatuController {
// Logger para registrar información sobre las solicitudes y su procesamiento
private static final Logger logger = LoggerFactory.getLogger(StatuController.class);

// Contador atómico para llevar un registro seguro de las invocaciones de los métodos del controlador
private final AtomicLong counter = new AtomicLong(0);

// Inyección de dependencia del servicio 'StatuService' que maneja la lógica de negocio para los objetos 'Statu'
@Autowired
private StatuService statuService;

/**
 * Maneja las solicitudes HTTP GET para obtener una lista de todos los estados (Status).
 * @return ResponseEntity con una lista de objetos 'Statu' y un código de estado HTTP 200 (OK)
 */
@GetMapping
public ResponseEntity<List<Statu>> getStatus() {
    long started = System.currentTimeMillis(); // Registra el tiempo de inicio de la solicitud
    List<Statu> status = statuService.getStatus(); // Llama al servicio para obtener la lista de estados
    final Long invocationNumber = counter.getAndIncrement(); // Incrementa el contador de invocaciones
    logger.info("StatuController#getStatus() invocation #{} returning status | #{} timed out after {} ms",
            invocationNumber, invocationNumber, System.currentTimeMillis() - started); // Registra la información sobre la invocación y el tiempo de procesamiento
    return ResponseEntity.ok(status); // Devuelve la lista de estados en la respuesta
}

/**
 * Maneja las solicitudes HTTP POST para crear un nuevo estado (Statu).
 * @param statu El objeto 'Statu' que se va a crear, recibido en el cuerpo de la solicitud
 * @return ResponseEntity con el objeto 'Statu' creado y un código de estado HTTP 200 (OK)
 */
@PostMapping
public ResponseEntity<Statu> createStatu(@RequestBody Statu statu) {
    long started = System.currentTimeMillis(); // Registra el tiempo de inicio de la solicitud
    statuService.createStatu(statu); // Llama al servicio para crear un nuevo estado
    final Long invocationNumber = counter.getAndIncrement(); // Incrementa el contador de invocaciones
    logger.info("StatuController#createStatu() invocation #{} returning status | #{} timed out after {} ms", invocationNumber, invocationNumber, System.currentTimeMillis() - started); // Registra la información sobre la invocación y el tiempo de procesamiento
    return ResponseEntity.ok(statu); // Devuelve el objeto 'Statu' creado en la respuesta
}

}

