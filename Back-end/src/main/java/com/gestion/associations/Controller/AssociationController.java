package com.gestion.associations.Controller;


import com.gestion.associations.Entity.Association;
import com.gestion.associations.Entity.Centre;
import com.gestion.associations.Service.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/association")
@CrossOrigin
public class AssociationController {
    @Autowired
    private AssociationService associationService;

    @DeleteMapping("/delete/{id}")
    public void deleteAssociation(@PathVariable("id") Long id) {
        associationService.deleteAssociation(id);
    }

    @DeleteMapping("/delete/all")
    public void deleteAssociations() {
        associationService.deleteAllAssociations();
    }



    @GetMapping("/all")
    public List<Association> allAssociations() {
        return associationService.getAllAssociations();
    }

    @GetMapping("/find/{associationId}")
    public Association findAssociation(@PathVariable Long associationId) {
        return associationService.findAssociationById(associationId);
    }

    @PutMapping("/update")
    public Association updateAssociation(@RequestBody Association association) {
        return associationService.updateAssociation(association);
    }
    @PutMapping("/update/{associationId}/{index_prev}/{index_prev_prev}")
    public Association updateAssociationById(@PathVariable Long associationId, @PathVariable Long index_prev, @PathVariable Long index_prev_prev){
        return associationService.updateAssociationById(associationId, index_prev, index_prev_prev);
    }

    @PostMapping("/save")
    public Association saveAssociation(@RequestBody Association association) {
        return associationService.saveAssociation(association);
    }

    @PostMapping("/save/all")
    public List<Association> saveAllAssociation(@RequestBody List<Association> associations) {
        return associationService.saveAllAssociations(associations);
    }
    @PostMapping("/save2")
    public Association saveAssociation2(@RequestBody Association association, @RequestParam("centre_id") Long centreId) {
        return associationService.saveAssociation2(association, centreId);
    }
    @PostMapping("/{centreId}/save")
    public Association saveAssociation3(@RequestBody Association association, @PathVariable("centreId") Long centreId) {

        return associationService.saveAssociation2(association, centreId);
    }

    @GetMapping("/look/{associationId}")
    public String getAssociationNameById(@PathVariable("associationId") Long associationId){
        return associationService.getAssociationNameById(associationId);
    }
}
