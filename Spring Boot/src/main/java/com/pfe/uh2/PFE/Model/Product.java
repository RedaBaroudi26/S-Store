package com.pfe.uh2.PFE.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct ;

    private String productName ;
    private double price ;
    private int qtStock ;
    private String description ;

    @ManyToOne
    @JoinColumn(name="id_category")
    private Category category ;

    @ManyToOne
    @JoinColumn(name="id_tva")
    private TVA tva ;

    @OneToMany(mappedBy = "product" )
    @JsonIgnore
    private List<Commande> commande ;

    @OneToMany(mappedBy = "product")
    private List<Image> images ;


    public Product() {
    }

    public Product(Long idProduct, String productName, double price, int qtStock, String description, Category category, TVA tva, List<Commande> commande, List<Image> images) {
        this.idProduct = idProduct;
        this.productName = productName;
        this.price = price;
        this.qtStock = qtStock;
        this.description = description;
        this.category = category;
        this.tva = tva;
        this.commande = commande;
        this.images = images;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQtStock() {
        return qtStock;
    }

    public void setQtStock(int qtStock) {
        this.qtStock = qtStock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public TVA getTva() {
        return tva;
    }

    public void setTva(TVA tva) {
        this.tva = tva;
    }

    public List<Commande> getCommande() {
        return commande;
    }

    public void setCommande(List<Commande> commande) {
        this.commande = commande;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
