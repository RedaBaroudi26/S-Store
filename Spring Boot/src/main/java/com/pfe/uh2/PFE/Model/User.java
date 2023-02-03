package com.pfe.uh2.PFE.Model;

import javax.persistence.*;

@Entity
@Table(name="User")
public class User {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long IdUser ;
      private String firstName ;
      private String lastName ;
      private String adresse ;
      private String country ;
      private String phone ;

      @OneToOne(cascade = CascadeType.ALL)
      @JoinColumn(name="id_account")
      private Account account ;

      public User() {
      }

      public User(Long idUser, String firstName, String lastName, String adresse, String country, String phone, Account account) {
            IdUser = idUser;
            this.firstName = firstName;
            this.lastName = lastName;
            this.adresse = adresse;
            this.country = country;
            this.phone = phone;
            this.account = account;
      }

      public Long getIdUser() {
            return IdUser;
      }

      public void setIdUser(Long idUser) {
            IdUser = idUser;
      }

      public String getFirstName() {
            return firstName;
      }

      public void setFirstName(String firstName) {
            this.firstName = firstName;
      }

      public String getLastName() {
            return lastName;
      }

      public void setLastName(String lastName) {
            this.lastName = lastName;
      }

      public String getAdresse() {
            return adresse;
      }

      public void setAdresse(String adresse) {
            this.adresse = adresse;
      }

      public String getCountry() {
            return country;
      }

      public void setCountry(String country) {
            this.country = country;
      }

      public String getPhone() {
            return phone;
      }

      public void setPhone(String phone) {
            this.phone = phone;
      }

      public Account getAccount() {
            return account;
      }

      public void setAccount(Account account) {
            this.account = account;
      }

}
