package com.pfe.uh2.PFE.Controller;


import com.pfe.uh2.PFE.Model.Account;
import com.pfe.uh2.PFE.Model.Commande;
import com.pfe.uh2.PFE.Service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/account")
public class AccountController {

    private AccountService accountService ;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts(){
        return new ResponseEntity<>(this.accountService.getAllAccounts() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<Account> addAccount(@RequestBody Account account){
        return new ResponseEntity<>(this.accountService.addAccount(account) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account){
        return new ResponseEntity<>(this.accountService.updateAccount(account) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable("id") Long idAccount){
        this.accountService.deleteAccount(idAccount);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }

    @GetMapping("/commandes/{id}")
    public ResponseEntity<List<Commande>> getAllCommandesByAccountId(@PathVariable("id") Long idAccount){
        return new ResponseEntity<>(this.accountService.getAllCommandesByAccountId(idAccount) , HttpStatus.OK) ;
    }

}
