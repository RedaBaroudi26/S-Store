package com.pfe.uh2.PFE.Model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Account")
public class Account {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long idAccount ;

      @Column(unique = true)
      private String email ;

      @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
      private String password ;

      @JsonFormat(pattern="dd-MM-yyyy")
      private Date dateCreation ;

      @OneToOne(mappedBy = "account")
      @JsonIgnore
      private User user ;

      @OneToMany(mappedBy = "account" , cascade = CascadeType.REMOVE )
      @JsonManagedReference
      private List<Commande> commandes ;

      @ManyToMany(fetch = FetchType.EAGER)
      private Collection<Role> roles = new ArrayList<>();


      public Account() {
      }

      public Account(Long idAccount, String email, String password, Date dateCreation, User user, List<Commande> commandes, Collection<Role> roles) {
            this.idAccount = idAccount;
            this.email = email;
            this.password = password;
            this.dateCreation = dateCreation;
            this.user = user;
            this.commandes = commandes;
            this.roles = roles;
      }

      public Long getIdAccount() {
            return idAccount;
      }

      public void setIdAccount(Long idAccount) {
            this.idAccount = idAccount;
      }

      public String getEmail() {
            return email;
      }

      public void setEmail(String email) {
            this.email = email;
      }

      public String getPassword() {
            return password;
      }

      public void setPassword(String password) {
            this.password = password;
      }

      public Date getDateCreation() {
            return dateCreation;
      }

      public void setDateCreation(Date dateCreation) {
            this.dateCreation = dateCreation;
      }

      public User getUser() {
            return user;
      }

      public void setUser(User user) {
            this.user = user;
      }

      public List<Commande> getCommandes() {
            return commandes;
      }

      public void setCommandes(List<Commande> commandes) {
            this.commandes = commandes;
      }

      public Collection<Role> getRoles() {
            return roles;
      }

      public void setRoles(Collection<Role> roles) {
            this.roles = roles;
      }
}
