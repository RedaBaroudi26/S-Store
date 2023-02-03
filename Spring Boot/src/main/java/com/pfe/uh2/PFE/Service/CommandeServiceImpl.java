package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Commande ;
import com.pfe.uh2.PFE.Repository.AccountRepository;
import com.pfe.uh2.PFE.Repository.CommandeRepository ;
import com.pfe.uh2.PFE.Repository.ProductRepository;
import org.springframework.stereotype.Service ;

import java.util.List;

@Service
public class CommandeServiceImpl implements CommandeService {

    private CommandeRepository commandeRepository ;
    private ProductRepository productRepository ;
    private AccountRepository accountRepository ;

    public CommandeServiceImpl(CommandeRepository commandeRepository, ProductRepository productRepository, AccountRepository accountRepository) {
        this.commandeRepository = commandeRepository;
        this.productRepository = productRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Commande> getAllCommandes(){
        return this.commandeRepository.findAll() ;
    }

    @Override
    public Commande addCommande(Commande commande){
        this.checkCommande(commande);
        return this.commandeRepository.saveAndFlush(commande) ;
    }

    @Override
    public Commande updateCommande(Commande commande){
        this.checkCommande(commande);
        if(!this.commandeRepository.findById(commande.getIdCommande()).isPresent()){
            throw new ApiRequestException("commande not found") ;
        }
        return this.commandeRepository.saveAndFlush(commande);
    }

    @Override
    public void deleteCommande(Long idCommande){
        if(!this.commandeRepository.findById(idCommande).isPresent()){
            throw new ApiRequestException("commande not found , this id doesn't exists") ;
        }
        this.commandeRepository.deleteById(idCommande);
    }


    public void checkCommande(Commande commande){
        if(!this.accountRepository.findById(commande.getAccount().getIdAccount()).isPresent()){
            throw new ApiRequestException("the Account doesn't exists") ;
        }
        if(!this.productRepository.findById(commande.getProduct().getIdProduct()).isPresent()){
            throw new ApiRequestException("the Product doesn't exists") ;
        }
    }

}
