import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ICommande } from '../../model/commande';
import { IProduct } from '../../model/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../service/user.service';
import { CommandeService } from '../../service/commande.service';
import { ProductService } from '../../service/product.service';

declare const myTest : any ; 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit , OnDestroy{

  @ViewChild(NavbarComponent) private navBar! : NavbarComponent ;  

  product$ : Observable<IProduct>  ;

  similarProducts$ : Observable<IProduct[]> ;

  subs : Subscription ;

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

  isAuth : boolean = ! this.userService.auth ;

  qteAct : number = 1 ;

  constructor(private route : ActivatedRoute , public productService : ProductService , private commandeService : CommandeService , private userService : UserService) { }
 
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    
    myTest()  ;
    this.getProduct() ;
    
  }


  getProduct(){
   
     let id : number  ;

    this.route.paramMap.subscribe(
  
      params => {  id = Number(params.get('id')) ;
  
      this.product$ = this.productService.getProductById(id) ; 

      this.subs = this.product$.subscribe( ( pr  => { 
        this.similarProducts$ = this.productService.getProductByCategory(pr.category.categoryName).pipe( map( prs  => { return prs.filter( pr => pr.idProduct != id ).slice(0,4) }  ) )  ;
      } ) ) ;

    })


    

  }

  addCommande(product : IProduct , qte : number){ 
    this.productSelected = product     
    this.qteAct = qte ;
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
      (response  : ICommande ) => {   document.getElementById('btn1').click() ; this.navBar.getAllCommandes() ; } , 
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
