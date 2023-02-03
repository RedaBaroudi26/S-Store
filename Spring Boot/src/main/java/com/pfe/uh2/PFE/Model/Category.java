package com.pfe.uh2.PFE.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategory ;
    private String categoryName ;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products ;

    public Category() {
    }

    public Category(Long idCategory, String categoryName, List<Product> products) {
        this.idCategory = idCategory;
        this.categoryName = categoryName;
        this.products = products;
    }

    public Long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Long idCategory) {
        this.idCategory = idCategory;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
