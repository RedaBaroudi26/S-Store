package com.pfe.uh2.PFE.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="TVA")
public class TVA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTva ;

    private String etat ;
    private int percentage ;

    @OneToMany(mappedBy = "tva")
    @JsonIgnore
    private List<Product> products ;

    public TVA() {
    }

    public TVA(Long idTva, String etat, int percentage, List<Product> products) {
        this.idTva = idTva;
        this.etat = etat;
        this.percentage = percentage;
        this.products = products;
    }

    public Long getIdTva() {
        return idTva;
    }

    public void setIdTva(Long idTva) {
        this.idTva = idTva;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
