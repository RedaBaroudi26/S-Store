package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findImageByidImage(Long idImage);

}