package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.TVA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TvaRepository extends JpaRepository<TVA , Long> {
}
