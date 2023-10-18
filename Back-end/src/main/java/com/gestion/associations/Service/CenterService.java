package com.gestion.associations.Service;

import com.gestion.associations.Entity.Association;
import com.gestion.associations.Entity.Centre;
import com.gestion.associations.Repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CenterService {
    @Autowired
    private CenterRepository centerRepository;

    public void deleteCentre(Long id) {
        centerRepository.deleteById(id);
    }

    public void deleteAllCentres() {
        centerRepository.deleteAll();
    }

    public List<Centre> getAllCentres() {
        return centerRepository.findAll();
    }

    public Centre findCentreById(Long centreId) {
        Optional<Centre> centreOptional = centerRepository.findById(centreId);
        return centreOptional.orElse(null);
    }

    public Centre updateCentre(Centre centre) {
        return centerRepository.save(centre);
    }

    public Centre saveCentre(Centre centre) {
        return centerRepository.save(centre);
    }

    public List<Centre> saveAllCentres(List<Centre> centres) {
        return centerRepository.saveAll(centres);
    }


}
