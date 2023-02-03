package com.pfe.uh2.PFE.Controller;

import com.pfe.uh2.PFE.Model.Commande;
import com.pfe.uh2.PFE.Service.CommandeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/commande")
public class CommandeController {

    private CommandeService commandeService  ;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Commande>> getAllCommandes(){
        return new ResponseEntity<>(this.commandeService.getAllCommandes() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<Commande> addCommande(@RequestBody Commande commande){
        return new ResponseEntity<>(this.commandeService.addCommande(commande) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<Commande> updateCommande(@RequestBody Commande commande){
        return new ResponseEntity<>(this.commandeService.updateCommande(commande) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable("id") Long idCommande){
        this.commandeService.deleteCommande(idCommande);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }

}
