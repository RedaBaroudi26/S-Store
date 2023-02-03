package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.Account;
import com.pfe.uh2.PFE.Model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account , Long> {

     boolean existsAccountByEmail(String email);

     @Query(" select c from Commande c where c.account.idAccount = :idAccount ")
     List<Commande> getAllCommandesByIdAccount(@Param("idAccount") Long idAccount) ;

}
