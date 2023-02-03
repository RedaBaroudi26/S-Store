import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommande } from '../../model/commande';
import { IProduct, PageProduct } from '../../model/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../service/user.service';
import { CommandeService } from '../../service/commande.service';
import { ProductService } from '../../service/product.service';

declare const myTest : any ;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit  {

  @ViewChild(NavbarComponent) private navBar! : NavbarComponent ;

  pageProducts$: Observable<PageProduct>;

  private pageSize: number = 16 ;

  isAuth : boolean = ! this.userService.auth ;

  commandes : ICommande [] ;

  constructor(public productService : ProductService , private commandeService : CommandeService , private userService : UserService) { }
 

  productSelected : IProduct = {
    idProduct: 2,
    productName: "Aerocool ThunderX3 Arctic White",
    description: "Only Description here",
    qtStock: 12,
    price: 300,
    category: { idCategory: 3, categoryName: "Gaming Chair" },
    tva: { idTva: 2, etat: "", percentage: 20 },
    images: [{ idImage: 1, imageUrl: "MAT_PIC/Gaming Chair/Aerocool-ThunderX3-Arctic-White-01.jpg" },
    { idImage: 2, imageUrl: "MAT_PIC/Gaming Chair/Aerocool-ThunderX3-Arctic-White-02.jpg" }]
  } ;

  ngOnInit(): void {

    this.pageProducts$ = this.productService.getProductsByPage( 0 , this.pageSize );

    myTest();

  }

  
  addCommande(product : IProduct , qte : number){
          
          let date = new Date() ;
          let newCommande : ICommande = {
            account : this.userService.user.account ,
            product: product,
            quantity: qte,
            dateCommande: date,
            total: product.price * qte,
            idCommande: null
          };

          this.commandeService.createCommande(newCommande).subscribe(
            (response  : ICommande ) => {  document.getElementById('btn1').click() , this.navBar.getAllCommandes() ; } , 
            (error : HttpErrorResponse ) => { alert(error) }
          ); 

  }


  close(){
    document.getElementById('XX').click() ;
  }

  getImage(product : IProduct , num : number){
    return this.productService.getImage(product , num) ;
  }
 

}
