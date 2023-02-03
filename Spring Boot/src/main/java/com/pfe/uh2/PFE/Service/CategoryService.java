package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.Category;
import java.util.List;


public interface CategoryService {
    List<Category> getAllCategories();

    Category addCategory(Category category);

    Category updateCategory(Category category);

    void deleteCategory(Long idCategory);
}
