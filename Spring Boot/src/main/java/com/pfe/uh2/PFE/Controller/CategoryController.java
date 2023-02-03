package com.pfe.uh2.PFE.Controller;


import com.pfe.uh2.PFE.Model.Category;
import com.pfe.uh2.PFE.Service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private CategoryService categoryService  ;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategoryies(){
        return new ResponseEntity<>(this.categoryService.getAllCategories() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        return new ResponseEntity<>(this.categoryService.addCategory(category) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category){
        return new ResponseEntity<>(this.categoryService.updateCategory(category) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long idCategory){
        this.categoryService.deleteCategory(idCategory);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }


}
