package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande , Long> {
}
