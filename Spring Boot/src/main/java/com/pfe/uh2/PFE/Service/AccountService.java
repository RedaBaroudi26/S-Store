package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.Account;
import com.pfe.uh2.PFE.Model.Commande;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


public interface AccountService {
    List<Account> getAllAccounts();

    Account addAccount(Account account);

    Account updateAccount(Account account);

    void deleteAccount(Long idAccount);

    List<Commande> getAllCommandesByAccountId(Long idAccount);

}
