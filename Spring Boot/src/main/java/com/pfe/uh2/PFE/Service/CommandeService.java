package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.Commande;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


public interface CommandeService {
    List<Commande> getAllCommandes();

    Commande addCommande(Commande commande);

    Commande updateCommande(Commande commande);

    void deleteCommande(Long idCommande);
}
