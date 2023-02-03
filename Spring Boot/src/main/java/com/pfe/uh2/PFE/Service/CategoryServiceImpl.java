package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Category;
import com.pfe.uh2.PFE.Repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    @Override
    public Category addCategory(Category category) {

        if(this.categoryRepository.findCategoryByCategoryName(category.getCategoryName()).isPresent()){
          throw new ApiRequestException("category already exists") ;
        }

        return this.categoryRepository.saveAndFlush(category);
    }

    @Override
    public Category updateCategory(Category category) {
        if(!this.categoryRepository.findById(category.getIdCategory()).isPresent()){
            throw new ApiRequestException("category not found") ;
        }
        return this.categoryRepository.saveAndFlush(category);
    }

    @Override
    public void deleteCategory(Long idCategory) {
        if(!this.categoryRepository.findById(idCategory).isPresent()){
            throw new ApiRequestException("category not found") ;
        }
        this.categoryRepository.deleteById(idCategory);
    }

}
