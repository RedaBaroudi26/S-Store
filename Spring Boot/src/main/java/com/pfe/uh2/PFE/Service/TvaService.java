package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.TVA;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


public interface TvaService {
    List<TVA> getAllTvas();

    TVA addTva(TVA tva);

    TVA updateTva(TVA tva);

    void deleteTva(Long idTva);
}
