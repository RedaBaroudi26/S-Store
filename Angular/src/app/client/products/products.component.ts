
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ICategory } from '../../model/category';
import { ICommande } from '../../model/commande';
import { IProduct, PageProduct } from '../../model/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
import { CommandeService } from '../../service/commande.service';
import { ProductService } from '../../service/product.service';


declare const myTest : any ;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsClientComponent implements OnInit  {

  @ViewChild(NavbarComponent) private navBar! : NavbarComponent ;  

  categories$ : Observable<ICategory[]> ;

  pageSize = 6 ;

  filterBy = {
              categorie : 'all' ,
              price :  0
            }   

  Tags = [ 'Computer Components' , 'Computer Accessories & Peripherals' , 'Gaming Chair' , 'Laptops' , 'Desktop' ] ;

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
  
  pageProducts$: Observable<PageProduct>;

  constructor(private route : ActivatedRoute , public productService : ProductService , private categoryService : CategoryService , private userService : UserService , private commandeService : CommandeService) { }
  

  ngOnInit(): void {
      
      myTest();

      this.FilterByRouting() ;

      this.categories$ = this.categoryService.categories$ ;

  }



  Filter(category : string , price : number){
    
    if( category != 'all' ){
      this.filterBy.categorie = category ;
    }
    
    if( price != 0 ){
      this.filterBy.price = price ;
    }

    this.pageProducts$ = this.productService.getProductByCategoryAndPrice(this.filterBy.categorie , this.filterBy.price , 0 , this.pageSize) ;
  
  }


  FilterByRouting(){
    this.route.queryParamMap.subscribe(
      params => { this.filterBy.categorie = params.get('filterBy') ||  "all" ;
                    if( this.filterBy.categorie != "all" ){
                           this.pageProducts$ = this.productService.getProductByCategoryAndPrice(this.filterBy.categorie , 0 , 0 , this.pageSize) ;
                    }else{
                           this.pageProducts$ = this.productService.productsPage$ ;
                    }
            }
    ) 
  }


  addCommande(product : IProduct , qte : number){ 
    this.productSelected = product ;
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
      (response  : ICommande ) => { this.navBar.getAllCommandes() ; document.getElementById('btn1').click() ;} , 
      (error : HttpErrorResponse ) => { alert(error) }
    ); 

  }

  
  clearAll(){
    this.filterBy.categorie = 'all' ;
    this.filterBy.price = 0 ;
    this.pageProducts$ = this.productService.productsPage$ ;
  }


  close(){
    document.getElementById('XX').click() ;
  }

  getImage(product : IProduct , num : number){
    return this.productService.getImage(product , num) ;
  }

  counter(i: number ) {
    return new Array(i);
  }

  selectPage(page: number){
   
      if(this.filterBy.categorie != 'all' || this.filterBy.price != 0){
        this.pageProducts$ = this.productService.getProductByCategoryAndPrice(this.filterBy.categorie , this.filterBy.price , page , this.pageSize) ;
      }else{
        this.pageProducts$ = this.productService.getProductsByPage( page , this.pageSize );
      }
      
  }

}
