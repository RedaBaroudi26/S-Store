package com.pfe.uh2.PFE.Controller;

import com.pfe.uh2.PFE.Model.Product;
import com.pfe.uh2.PFE.Service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.ServletContext;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/api/product")
public class ProductController {

    private ProductService productService  ;
    private ServletContext context ;


    public ProductController(ProductService productService, ServletContext context) {
        this.productService = productService;
        this.context = context;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(this.productService.getAllProducts() , HttpStatus.OK) ;
    }

    @GetMapping("/productById/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long idProduct){
        return new ResponseEntity<>(this.productService.getProductById(idProduct) , HttpStatus.OK) ;
    }

    @GetMapping("/page/{offest}/{size}")
    public ResponseEntity<Page<Product>> getAllProducts(@PathVariable("offest") int offest , @PathVariable("size") int size){
        return new ResponseEntity<>(this.productService.getProducts(offest , size) , HttpStatus.OK) ;
    }

    @GetMapping("/containsWord/{word}")
    public ResponseEntity<List<Product>> getProductsByWord(@PathVariable("word") String word ){
        return new ResponseEntity<>(this.productService.getProductByWord(word) , HttpStatus.OK) ;
    }

    @GetMapping("/containsWord/{word}/{offset}/{size}")
    public ResponseEntity<Page<Product>> getProductsByWord(@PathVariable("word") String word , @PathVariable("offset") int offset , @PathVariable("size") int size){
        return new ResponseEntity<>(this.productService.getProductByWordPageable(word , offset , size) , HttpStatus.OK) ;
    }

    @GetMapping("/filterByPrice/{price}/{offset}/{size}")
    public ResponseEntity<Page<Product>> getProductsByPrice2(@PathVariable("price") double price , @PathVariable("offset") int offset , @PathVariable("size") int size){
        return new ResponseEntity<>(this.productService.getProductsByPricePageable(price , offset , size) , HttpStatus.OK) ;
    }


    @GetMapping("/filterByCategory/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("categoryName") String categoryName){
        return new ResponseEntity<>(this.productService.getProductsByCategoryName(categoryName) , HttpStatus.OK) ;
    }

    @GetMapping("/filterByCategoryAndPrice/{categoryName}/{price}/{offset}/{size}")
    public ResponseEntity<Page<Product>> getProductsByCategoryAndPrice(@PathVariable("categoryName") String categoryName , @PathVariable("price") double price , @PathVariable("offset") int offset ,@PathVariable("size") int size){
        return new ResponseEntity<>(this.productService.getProductsByPriceAndCategoryNamePageable(price , categoryName , offset ,size) , HttpStatus.OK) ;
    }

    @GetMapping("/ImgProduct/{id}/{num}")
    public byte[] getPhoto(@PathVariable("id") Long id ,@PathVariable("num") Long idImage ) throws Exception{
        Product product = productService.getProductById(id);
        return Files.readAllBytes(Paths.get(context.getRealPath("/images/")+this.productService.getImage(idImage).getImageUrl()));
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestParam("files") MultipartFile[] files ,@RequestParam("product") String product) throws Exception {
        return new ResponseEntity<>(this.productService.addProduct(files,product) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        return new ResponseEntity<>(this.productService.updateProduct(product) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long idProduct){
        this.productService.deleteProduct(idProduct);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }


}
