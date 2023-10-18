package com.gestion.associations.Service;

import com.gestion.associations.Entity.Association;
import com.gestion.associations.Entity.Centre;
import com.gestion.associations.Entity.Facture;
import com.gestion.associations.Repository.AssociationRepository;
import com.gestion.associations.Repository.CenterRepository;
import com.gestion.associations.Repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class AssociationService {
    @Autowired
    private AssociationRepository associationRepository;
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private FactureRepository factureRepository;

    public void deleteAssociation(Long id) {
        associationRepository.deleteById(id);
    }

    public void deleteAllAssociations() {
        associationRepository.deleteAll();
    }

    public List<Association> getAllAssociations() {
        return associationRepository.findAll();
    }

    public Association findAssociationById(Long associationId) {
        Optional<Association> associationOptional = associationRepository.findById(associationId);
        return associationOptional.orElse(null);
    }

    public Association updateAssociation(Association association) {
        return associationRepository.save(association);
    }

    public Association saveAssociation(Association association) {

        return associationRepository.save(association);
    }

    public Association saveAssociation2(Association association, Long centreId) {

        Centre centre = centerRepository.findById(centreId).get();
        centre.addAssociation(association) ;
        return associationRepository.save(association);}

    public  List<Association> saveAllAssociations(List<Association> associations) {
        return associationRepository.saveAll(associations);
    }

    public Association updateAssociationById(Long associationId, Long index_prev, Long index_prev_prev) {
        Association association = associationRepository.findById(associationId).get();
        association.setIndex_prev(index_prev);
        association.setIndex_prev_prev(index_prev_prev);
        return associationRepository.save(association);
    }

    public String getAssociationNameById(Long associationId) {
        Optional<Association> associationOptional = associationRepository.findById(associationId);
        if (associationOptional.isPresent()) {
            Association association = associationOptional.get();
            return association.getName();
        } else {

            return "Association introuvable";
        }
    }

    public Association findAssociaitonFromFacture(Long factureId){

        Facture f = factureRepository.findById(factureId).orElse(null) ;

        return f.getAssociation() ;
    }
}

