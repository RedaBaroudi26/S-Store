package com.pfe.uh2.PFE.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImage ;

    private String imageUrl ;

    @ManyToOne
    @JoinColumn(name = "id_product")
    @JsonIgnore
    private Product product ;

    public Image() {
    }

    public Image(Long idImage, String imageUrl, Product product) {
        this.idImage = idImage;
        this.imageUrl = imageUrl;
        this.product = product;
    }

    public Long getIdImage() {
        return idImage;
    }

    public void setIdImage(Long idImage) {
        this.idImage = idImage;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
