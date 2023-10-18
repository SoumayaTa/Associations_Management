package com.gestion.associations.Controller;

import com.gestion.associations.Entity.Association;
import com.gestion.associations.Entity.Facture;
import com.gestion.associations.Repository.FactureRepository;
import com.gestion.associations.Service.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/facture")
@CrossOrigin
public class FactureController {
    @Autowired
    private FactureService factureService;

    @DeleteMapping("/delete/{id}")
    public void deleteFacture(@PathVariable("id") Long id) {
        factureService.deleteFacture(id);
    }

    @DeleteMapping("/deleteall")
    public void deleteFactures() {
        factureService.deleteAllFactures();
    }

    @GetMapping("/all")
    public List<Facture> allFactures() {
        return factureService.getAllFactures();
    }

    @GetMapping("/find/{factureId}")
    public Facture findFacture(@PathVariable Long factureId) {
        return factureService.findFactureById(factureId);
    }

    @PutMapping("/update")
    public Facture updateFacture(@RequestBody Facture facture) {
        return factureService.updateFacture(facture);
    }


    @PostMapping("/save")
    public Facture saveFacture(@RequestBody Facture facture) {
        return factureService.saveFacture(facture);
    }

    @PostMapping("/save/all")
    public List<Facture> saveAllFactures(@RequestBody List<Facture> factures) {
        return factureService.saveAllFactures(factures);
    }
    @PostMapping("/{associationId}/save")
    public Facture saveFacture3(@RequestBody Facture facture, @PathVariable("associationId") Long associationId) {

        return factureService.saveFacture2(facture, associationId);
    }

    @GetMapping("/findAssociationFromFacture/{factureId}")
    public Association findAssociaitonFromFacture(@PathVariable Long factureId) {
       return factureService.findAssociaitonFromFacture(factureId);
    }
    @GetMapping("/find/{month}/{year}")
    public  List<Facture> getFacturesByDate(@PathVariable("month") int month, @PathVariable("year") int year){
        return factureService.getFacturesByDate(month,year);

    }
    @GetMapping("findbyyear/{year}")
    public List<Facture> getFacturesByYear(@PathVariable("year") int year){
        return factureService.getFacturesByYear(year);
    }

}
