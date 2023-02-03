import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/category';
import { IProduct } from 'src/app/model/product';
import { ITva } from 'src/app/model/Tva';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from '../../service/category.service';
import { TvaService } from '../../service/tva.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

 collapsed = false;
 screenWidth = 0;
 imageUrl : any ;
 imageUrl2 : any ;
 productImage1 : any ;
 productImage2 : any ;
 messageError : string ;

  getBodyClass():string {
    let styleClass ='';
    if(this.collapsed && this.screenWidth >768){
      styleClass='body-trimmed';
    }else if(this.collapsed && this.screenWidth <=768 && this.screenWidth> 0){
      styleClass='body-md-screen';
    }
    return styleClass;
  }
    

    productData! : any ;

    productsObj : IProduct = {
      idProduct : null ,
      productName : "" ,
      description : "" ,
      price : 0 ,
      qtStock : 0 ,
      category : {
        idCategory : 0 ,
        categoryName : ""
      } ,
      tva : {
        idTva : 0 , 
        etat : "" ,
        percentage : 0
      } ,
      images : []
    } ;

    upProduct : IProduct = {
      idProduct : 0 ,
      productName : "" ,
      description : "" ,
      price : 0 ,
      qtStock : 0 ,
      category : {
        idCategory : 0 ,
        categoryName : ""
      } ,
      tva : {
        idTva : 0 ,
        etat : "" ,
        percentage : 0
      } ,
      images :[]
    } ;

    categoryData : ICategory [] ;
    TvaData : ITva [] ;  


  constructor( public productService : ProductService , private categoryService : CategoryService , private tvaService : TvaService) { }

  ngOnInit(): void {

    this.getAllCategory() ;
    this.getAllProduct() ;
    this.getAllTvas();

  }

    postProductDetails(){

        const formData = new FormData() ;

        for(let category of this.categoryData ){
            if(category.idCategory == this.productsObj.category.idCategory){
               this.productsObj.category = category ;
            }
        }

        const product = this.productsObj ;
        // console.log(product) ;
        formData.append('product' , JSON.stringify(product))  ;
        formData.append('files' , this.productImage1) ;
        formData.append('files' , this.productImage2) ;
       this.productService.addProduct(formData).subscribe(res =>{
        // console.log(res);
        alert('product added Successfully')
        let ref = document.getElementById('btn2')
        ref?.click();
        this.getAllProduct();
      },
      err =>{
        alert('somthing went wrong')
      }) 
    
    }

    deleteProduct(row : any){
        this.productService.deleteProduct(row.idProduct).subscribe(res=>{
          alert('product deleted')
          this.getAllProduct();
        })
    }
    
    
    onEdit(){

      this.productService.updateProduct(this.upProduct).subscribe(res=>{
        alert('Update Successfully');
        let ref =document.getElementById('btn3')
        ref?.click();
        this.getAllProduct();
      })

    }


    getAllProduct(){
      this.productService.getAllProducts().subscribe(
        (products:IProduct[]) => { this.productData = products ; }
      )
    }


    getAllCategory(){
      this.categoryService.getAllCategories()
      .subscribe(res=>{
        this.categoryData = res ;
      })
    }

    getAllTvas(){
      this.tvaService.getAllTvas()
      .subscribe(res=>{
        this.TvaData = res ;
      })
    }


    onSelectFile(event : any){

        if(event.target.files.length > 0){
          const file = event.target.files[0];
          this.productImage1 = file ;

          var mimeType = event.target.files[0].type ;

          if(mimeType.match(/image\/*/) == null ){
              this.messageError = "Only images are Supported" ;
              return ;
          }

          var reader = new FileReader() ;

          this.imageUrl = file ;
          reader.readAsDataURL(file) ;
          reader.onload = (_event) => {
               this.imageUrl = reader.result ;
          }


        } 
         
    }


    onSelectFile2(event : any){

      if(event.target.files.length > 0){
        const file = event.target.files[0];
        this.productImage2 = file ;

        var mimeType = event.target.files[0].type ;

        if(mimeType.match(/image\/*/) == null ){
            this.messageError = "Only images are Supported" ;
            return ;
        }

        var reader = new FileReader() ;

        this.imageUrl2 = file ;
        reader.readAsDataURL(file) ;
        reader.onload = (_event) => {
             this.imageUrl2 = reader.result ;
        }


      } 
       
  }

  getImage(product : IProduct){
    return this.productService.getImage(product , 0) ;
  }


  }
  

