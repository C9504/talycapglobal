package com.talycapglobal.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talycapglobal.entities.Statu;
import com.talycapglobal.repositories.StatuRepository;

@Service
public class StatuService {

    /**
     * Repositorio de Statu
     */
    @Autowired
    private StatuRepository statuRepository;

    /**
     * Obtiene todos los Statu
     * @return
     */
    public List<Statu> getStatus() {
        return statuRepository.findAll();
    }

    /**
     * Crea un nuevo Statu
     * @param statu
     * @return
     */
    public Statu createStatu(Statu statu) {
        return statuRepository.save(statu);
    }
    
}
