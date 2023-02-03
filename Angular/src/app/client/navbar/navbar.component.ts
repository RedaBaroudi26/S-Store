import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '../../model/category';
import { ICommande } from '../../model/commande';
import { IProduct, PageProduct } from '../../model/product';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
import { ProductService } from '../../service/product.service';
import { CommandeService } from 'src/app/service/commande.service';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {

  private _FilterByWord : any ;
 
  private size : number = 6 ;

  private offset : number = 0 ;

  categories$ : Observable<ICategory[]> ;

  productsPage$ : Observable< PageProduct > ;
  
  commandes : ICommande[] ;

  isAuth : boolean ;


  constructor(private userService : UserService , private commandeService : CommandeService, public productService : ProductService , private categoryService : CategoryService , private router : Router ) { }



  set FilterByWord(word:string){
          this.filterByWord(word) ;
          this._FilterByWord = word ;
  }

  get FilterByWord(){
      return this._FilterByWord  ;
  }


  ngOnInit(): void {

    this.getAllCategories() ;

    this.isAuth = this.userService.auth ;

    if(this.isAuth){
      this.getAllCommandes() ;
    }

  }


  filterByWord(word : string){
 
     if(word == ""){
       word = " " ;
     }

     this.productsPage$ = this.productService.getProductsByWord(word , this.offset , this.size) ; 
  }

  getAllCategories(){
   this.categories$ = this.categoryService.categories$ ;
  }

  signOut(){
    this.userService.user = null ;
    localStorage.removeItem("accessToken") ;  
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }

  getAllCommandes(){
    this.commandeService.getCommandesByAccount(this.userService.user.account.idAccount).subscribe(
         (data : ICommande[]) => this.commandes = data 
    ) ;
  }

  getImage(product : IProduct , num : number){
    return this.productService.getImage(product , num) ;
  }

}
