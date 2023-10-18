package com.gestion.associations.Service;

import com.gestion.associations.Entity.Association;
import com.gestion.associations.Entity.Centre;
import com.gestion.associations.Entity.Facture;
import com.gestion.associations.Repository.AssociationRepository;
import com.gestion.associations.Repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FactureService {
    @Autowired
    FactureRepository factureRepository;
    @Autowired
    AssociationRepository associationRepository;

    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }

    public void deleteAllFactures() {
        factureRepository.deleteAll();
    }

    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

    public Facture findFactureById(Long factureId) {
        Optional<Facture> factureOptional = factureRepository.findById(factureId);
        return factureOptional.orElse(null);
    }


    public List<Facture> findFacturesByYear(int year) {
        List<Facture> allFactures = factureRepository.findAll();

        return allFactures.stream()
                .filter(facture -> {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(facture.getDate());
                    int factureYear = calendar.get(Calendar.YEAR);
                    return factureYear == year;
                })
                .collect(Collectors.toList());
    }

    public Facture saveFacture2(Facture facture, Long associationId) {
        Association association = associationRepository.findById(associationId).orElse(null);
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        Long lastAnnualId = findLastAnnualIdByYear(currentYear);

        if (lastAnnualId != null) {
            facture.setAnnualId(lastAnnualId + 1);
        } else {
        
            facture.setAnnualId(1L);
        }

        association.addFacture(facture);
        return factureRepository.save(facture);
    }

    private Long findLastAnnualIdByYear(int year) {
        List<Facture> facturesForYear = findFacturesByYear(year);
        Optional<Long> maxAnnualId = facturesForYear.stream()
                .map(Facture::getAnnualId)
                .max(Long::compareTo);

        return maxAnnualId.orElse(null);
    }


    public Facture updateFacture(Facture facture ) {
        return factureRepository.save(facture);
    }

    public Facture saveFacture(Facture facture) {
        return factureRepository.save(facture);
    }

    public List<Facture> saveAllFactures(List<Facture> factures) {
        return factureRepository.saveAll(factures);
    }
    public Association findAssociaitonFromFacture(Long factureId){

        Facture f = factureRepository.findById(factureId).orElse(null) ;

        return f.getAssociation();
    }

    public List<Facture> getFacturesByDate(int month, int year){
        List<Facture> allFactures = factureRepository.findAll();
        List<Facture> filteredFactures = allFactures.stream()
                .filter(facture -> {
                    int factureMonth = facture.getDate().getMonth() + 1; // Months are 0-based in Java
                    int factureYear = facture.getDate().getYear() + 1900; // Year is offset by 1900
                    return factureMonth == month && factureYear == year;
                })
                .collect(Collectors.toList());

        return filteredFactures;
    }
    public List<Facture> getFacturesByYear(int year) {
        List<Facture> allFactures = factureRepository.findAll();

        return allFactures.stream()
                .filter(facture -> Year.of(facture.getDate().getYear() + 1900).getValue() == year)
                .collect(Collectors.toList());
    }

}
