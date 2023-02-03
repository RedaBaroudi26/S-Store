package com.pfe.uh2.PFE.Service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Image;
import com.pfe.uh2.PFE.Model.Product;
import com.pfe.uh2.PFE.Repository.ImageRepository;
import com.pfe.uh2.PFE.Repository.ProductRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.ServletContext;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository ;
    private ImageRepository imageRepository ;
    private ServletContext context ;

    public ProductServiceImpl(ProductRepository productRepository, ImageRepository imageRepository, ServletContext context) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
        this.context = context;
    }

    @Override
    public List<Product> getAllProducts(){
        return this.productRepository.findAll() ;
    }

    @Override
    public Product getProductById(Long idProduct){
        if(!this.productRepository.findById(idProduct).isPresent()){
            throw new ApiRequestException("Product not found") ;
        }
        return this.productRepository.findById(idProduct).get() ;
    }

    @Override
    public Page<Product> getProductsByPricePageable(double price , int offset , int size) {
        Pageable pageable = PageRequest.of(offset, size) ;
        return this.productRepository.findProductsByPriceIsLessThanEqual(price, pageable) ;
    }

    @Override
    public List<Product> getProductsByCategoryName(String categoryName) {
        return this.productRepository.findProductsByCategory_CategoryName(categoryName);
    }

    @Override
    public Page<Product> getProductsByPriceAndCategoryNamePageable(double price, String categoryName, int offset , int size) {

        Pageable pageable = PageRequest.of(offset , size) ;
        price = price == 0 ? Double.MAX_VALUE : price ;

        if(categoryName.equalsIgnoreCase("all") ){
            return this.productRepository.findProductsByPriceIsLessThanEqual(price , pageable) ;
        }

        return this.productRepository.findProductsByPriceIsLessThanEqualAndCategory_CategoryName(price , categoryName , pageable) ;
    }

    @Override
    public Page<Product> getProducts(int offest , int pageSize){
        return this.productRepository.findAll(PageRequest.of(offest , pageSize)) ;
    }

    @Override
    public List<Product> getProductByWord(String word) {
        Set<Product> p1 =  this.productRepository.findProductsByProductNameContains(word).stream().collect(Collectors.toSet());
        p1.addAll(this.productRepository.findProductsByDescriptionContains(word).stream().collect(Collectors.toSet()));
        p1.stream().sorted();
        return p1.stream().collect(Collectors.toList()) ;
    }

    @Override
    public Page<Product> getProductByWordPageable(String word, int offset, int size) {
        Pageable pageable = PageRequest.of(offset , size) ;
        return this.productRepository.findProductsByDescriptionContainsOrProductNameContains(word , word , pageable);
    }

    @Override
    public Product addProduct(MultipartFile[] files, String product) throws JsonProcessingException , Exception{

        Product _product = new ObjectMapper().readValue(product, Product.class);
        String[] imagesUrl = new String[5];
        List<Image> images = new ArrayList<>();

        boolean isExist = new File(context.getRealPath("/images/MAT_PIC/" + _product.getCategory().getCategoryName() + "/")).exists();

        if (!isExist) {
            new File(context.getRealPath("/images/MAT_PIC/" + _product.getCategory().getCategoryName() + "/")).mkdir();
        }

        for(int i= 0 ; i < files.length ; i++ ) {

            String filename = files[i].getOriginalFilename();
            String newFileName = "MAT_PIC/" + _product.getCategory().getCategoryName() + "/" + FilenameUtils.getBaseName(filename) + "." + FilenameUtils.getExtension(filename);
            imagesUrl[i] = newFileName ;
            File serverFile = new File(context.getRealPath("/images/" + File.separator + newFileName));

            try {
                FileUtils.writeByteArrayToFile(serverFile, files[i].getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        Image image = new Image(null,imagesUrl[0],_product);
        Image image2 = new Image(null,imagesUrl[1],_product);

        this.imageRepository.save(image) ;
        this.imageRepository.save(image2);

        images.add(image);
        images.add(image2);

        _product.setImages(images);

        Product pr = this.productRepository.saveAndFlush(_product) ;

        return pr ;
    }

    @Override
    public Product updateProduct(Product product){
        if(!this.productRepository.findById(product.getIdProduct()).isPresent()){
            throw new ApiRequestException("Product not found") ;
        }
        return this.productRepository.saveAndFlush(product);
    }

    @Override
    public void deleteProduct(Long idProduct){
        if(!this.productRepository.findById(idProduct).isPresent()){
            throw new ApiRequestException("Product not found") ;
        }
        this.productRepository.deleteById(idProduct);
    }

    @Override
    public Image getImage(Long idImage){
         return this.imageRepository.findImageByidImage(idImage);
    }

}
