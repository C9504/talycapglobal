package com.talycapglobal.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talycapglobal.entities.Priority;
import com.talycapglobal.repositories.PriorityRepository;

@Service
public class PriorityService {

    @Autowired
    PriorityRepository priorityRepository;

    public List<Priority> getPriorities() {
        return priorityRepository.findAll();
    }

    public Priority creaPriority(Priority priority) {
        return priorityRepository.save(priority);
    }
    
}
