package com.pfe.uh2.PFE.Controller;

import com.pfe.uh2.PFE.Model.TVA;
import com.pfe.uh2.PFE.Service.TvaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tva")
public class TvaController {

    private TvaService tvaService  ;

    public TvaController(TvaService tvaService) {
        this.tvaService = tvaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TVA>> getAllTVAs(){
        return new ResponseEntity<>(this.tvaService.getAllTvas() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<TVA> addTva(@RequestBody TVA tva){
        return new ResponseEntity<>(this.tvaService.addTva(tva) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<TVA> updateTva(@RequestBody TVA tva){
        return new ResponseEntity<>(this.tvaService.updateTva(tva) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTva(@PathVariable("id") Long idTva){
        this.tvaService.deleteTva(idTva);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }

}
