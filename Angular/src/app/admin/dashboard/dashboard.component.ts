import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
import { IUser } from 'src/app/model/user';
import { ICommande } from 'src/app/model/commande';
import { CommandeService } from 'src/app/service/commande.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   collapsed = false;
   screenWidth=0;

   users : IUser[] ;

   commandes : ICommande[] ;

   categoriesLength : number ;

   productsLength : number ;

  getBodyClass():string {
    let styleClass ='';
    if(this.collapsed && this.screenWidth >768){
      styleClass='body-trimmed';
    }else if(this.collapsed && this.screenWidth <=768 && this.screenWidth> 0){
      styleClass='body-md-screen';
    }
    return styleClass;
  }


  constructor(private userService : UserService , private commandeService : CommandeService , private catService : CategoryService , private productService : ProductService ) { }

  ngOnInit(): void {

  this.userService.getAllUsers().subscribe(
       (users : IUser []) => { this.users = users ;}
  );

  this.commandeService.getAllCommandes().subscribe(
    (commandes : ICommande[]) => {this.commandes = commandes} 
  ) ;

   this.catService.getAllCategories().subscribe(
    (categories ) => { this.categoriesLength = categories.length }
   )

   this.productService.getAllProducts().subscribe(
      (products) => { this.productsLength = products.length }
   )  

  }



  removeClient(clientId : number){
       this.userService.deleteUser(clientId).subscribe(
            response => { alert("success") } , 
            error => { alert(error) }
       )
  }


}
