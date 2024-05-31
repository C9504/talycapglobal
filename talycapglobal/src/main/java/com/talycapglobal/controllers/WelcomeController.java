package com.talycapglobal.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin //(origins = "*")
@RequestMapping("/")
public class WelcomeController {

    @GetMapping
    public String welcome() {
        return "Welcome";
    }
    
}
