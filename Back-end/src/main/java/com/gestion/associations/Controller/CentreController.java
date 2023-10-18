package com.gestion.associations.Controller;

import com.gestion.associations.Entity.Centre;
import com.gestion.associations.Service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/centre")
@CrossOrigin
public class CentreController {
    @Autowired
    private CenterService centerService;

    @DeleteMapping("/delete/{id}")
    public void deleteCentre(@PathVariable("id") Long id) {
        centerService.deleteCentre(id);
    }

    @DeleteMapping("/delete/all")
    public void deleteCentres() {
        centerService.deleteAllCentres();
    }

    @GetMapping("/all")
    public List<Centre> allCentres() {
        return centerService.getAllCentres();
    }

    @GetMapping("/find/{centreId}")
    public Centre findCentre(@PathVariable Long centreId) {
        return centerService.findCentreById(centreId);
    }

    @PutMapping("/update")
    public Centre updateCentre(@RequestBody Centre centre) {
        return centerService.updateCentre(centre);
    }

    @PostMapping("/save")
    public Centre saveCentre(@RequestBody Centre centre) {
        return centerService.saveCentre(centre);
    }

    @PostMapping("/save/all")
    public List<Centre> saveAllCentres(@RequestBody List<Centre> centres) {
        return centerService.saveAllCentres(centres);
    }

}
