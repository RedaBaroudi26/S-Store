package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product , Long> {

     List<Product> findProductsByProductNameContains(String word);
     List<Product> findProductsByDescriptionContains(String word);

     Page<Product> findProductsByDescriptionContainsOrProductNameContains(String word , String word2 , Pageable pageable);

     Page<Product> findProductsByPriceIsLessThanEqual(double price , Pageable pageable);

     List<Product> findProductsByCategory_CategoryName(String categoryName) ;

     Page<Product> findProductsByPriceIsLessThanEqualAndCategory_CategoryName(double price , String categoryName,Pageable pageable) ;

}
