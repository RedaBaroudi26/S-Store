package com.pfe.uh2.PFE.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCommande ;

    @JsonFormat(pattern="dd-MM-yyyy")
    private Date dateCommande ;

    private int quantity ;
    private double total ;

    @ManyToOne
    @JoinColumn(name="id_account")
    @JsonBackReference
    private Account account ;

    @ManyToOne
    @JoinColumn(name="id_product")
    private Product product ;

    public Commande() {
    }

    public Commande(Long idCommande, Date dateCommande, int quantity, double total, Account account, Product product) {
        this.idCommande = idCommande;
        this.dateCommande = dateCommande;
        this.quantity = quantity;
        this.total = total;
        this.account = account;
        this.product = product;
    }

    public Long getIdCommande() {
        return idCommande;
    }

    public void setIdCommande(Long idCommande) {
        this.idCommande = idCommande;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
