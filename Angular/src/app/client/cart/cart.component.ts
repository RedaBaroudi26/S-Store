import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommande } from '../../model/commande';
import { IProduct } from '../../model/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../service/user.service';
import { CommandeService } from '../../service/commande.service';
import { ProductService } from '../../service/product.service';

declare const myTest : any ;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild(NavbarComponent) private navBar! : NavbarComponent ;  

  constructor(private userService : UserService , private commandeService : CommandeService , public productService : ProductService) { }

  commandes$ : Observable<ICommande[]> ;

  subtotal$ : Observable<number> ;

  subTotal = 0 ;

  ngOnInit(): void {
    
    this.getAllCommandes() ;
    
     myTest();
    
    this.Subtotal();

  }

  clearCart(){
    
  }

  
  Subtotal(){
      this.subTotal = 0 ;
      this.commandes$.subscribe((commandes : ICommande []) => {  commandes.forEach( commande => { this.subTotal += commande.total } ) ; } )  ;
  }

  deleteCommande(idCommande : number){
         this.commandeService.deleteCommande(idCommande).subscribe(
            (resp) => { this.getAllCommandes() ; this.navBar.getAllCommandes() ; this.Subtotal() }  ,
            (error:HttpErrorResponse) => {console.log(error)}
         ) ;
  }

  getAllCommandes(){
    this.commandes$ = this.commandeService.getCommandesByAccount(this.userService.user.account.idAccount) ;
  }

  getImage(product : IProduct , num : number){
    return this.productService.getImage(product , num) ;
  }

}
