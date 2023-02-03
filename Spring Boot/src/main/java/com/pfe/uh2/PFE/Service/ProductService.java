package com.pfe.uh2.PFE.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pfe.uh2.PFE.Model.Image;
import com.pfe.uh2.PFE.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;



public interface ProductService {

    List<Product> getAllProducts();

    Page<Product> getProducts(int offest , int pageSize) ;

    List<Product> getProductByWord(String word) ;

    Page<Product> getProductByWordPageable(String word , int offset , int size) ;

    Page<Product> getProductsByPricePageable(double price , int offset , int size) ;

    Page<Product> getProductsByPriceAndCategoryNamePageable(double price , String categoryName , int offset , int size);

    List<Product> getProductsByCategoryName(String categoryName) ;

    Product getProductById(Long idProduct);

    Product addProduct(MultipartFile[] files, String product) throws JsonProcessingException, Exception;

    Product updateProduct(Product product);

    void deleteProduct(Long idProduct);

    Image getImage(Long idImage);

}
