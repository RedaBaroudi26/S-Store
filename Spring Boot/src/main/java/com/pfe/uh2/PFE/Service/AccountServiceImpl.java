package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Account;
import com.pfe.uh2.PFE.Model.Commande;
import com.pfe.uh2.PFE.Repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository ;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> getAllAccounts(){
       return this.accountRepository.findAll() ;
   }

   @Override
   public Account addAccount(Account account){
        if(this.accountRepository.existsAccountByEmail(account.getEmail())){
            throw new ApiRequestException("email already taken") ;
        }
        return this.accountRepository.saveAndFlush(account) ;
   }

   @Override
   public Account updateAccount(Account account){
        if(!this.accountRepository.findById(account.getIdAccount()).isPresent()){
            throw new ApiRequestException("account not found") ;
        }
        return this.accountRepository.saveAndFlush(account);
   }

   @Override
   public void deleteAccount(Long idAccount){
       if(!this.accountRepository.findById(idAccount).isPresent()){
           throw new ApiRequestException("account not found , this id doesnt exists ") ;
       }
        this.accountRepository.deleteById(idAccount);
   }

    @Override
    public List<Commande> getAllCommandesByAccountId(Long idAccount){
        if(!this.accountRepository.findById(idAccount).isPresent()){
            throw new ApiRequestException("account not found , this id doesnt exists ") ;
        }
        return this.accountRepository.getAllCommandesByIdAccount(idAccount) ;
    }


}
