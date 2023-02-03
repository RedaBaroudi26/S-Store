package com.pfe.uh2.PFE.Service;


import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.TVA;
import com.pfe.uh2.PFE.Repository.TvaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TvaServiceImpl implements TvaService {

    private TvaRepository tvaRepository ;

    public TvaServiceImpl(TvaRepository tvaRepository) {
        this.tvaRepository = tvaRepository;
    }

    @Override
    public List<TVA> getAllTvas(){
        return this.tvaRepository.findAll() ;
    }

    @Override
    public TVA addTva(TVA tva){
        return this.tvaRepository.saveAndFlush(tva) ;
    }

    @Override
    public TVA updateTva(TVA tva){
        if(!this.tvaRepository.findById(tva.getIdTva()).isPresent()){
            throw new ApiRequestException("Tva not Found") ;
        }
        return this.tvaRepository.saveAndFlush(tva);
    }

    @Override
    public void deleteTva(Long idTva){
        if(!this.tvaRepository.findById(idTva).isPresent()){
            throw new ApiRequestException("Tva not Found") ;
        }
        this.tvaRepository.deleteById(idTva);
    }

}
