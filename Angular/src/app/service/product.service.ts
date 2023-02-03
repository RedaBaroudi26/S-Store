import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, PageProduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiBaseUrl = "http://localhost:8080/api/product" ;

  host : string = "http://localhost:8080"; 

  constructor(private http : HttpClient) { }

  public getAllProducts() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiBaseUrl}/all`);
  }

  public getProductsByPage(offest : number , size : number):Observable<PageProduct>{
    return this.http.get<PageProduct>(`${this.apiBaseUrl}/page/${offest}/${size}`);
  }

  public getProductById(productId : number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.apiBaseUrl}/productById/${productId}`);
  }

  public getProductByCategory(categoryName : string):Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiBaseUrl}/filterByCategory/${categoryName}`);
  }

  public getProductByCategoryAndPrice(categoryName : string , price : number , offset : number , size : number ):Observable<PageProduct>{
    return this.http.get<PageProduct>(`${this.apiBaseUrl}/filterByCategoryAndPrice/${categoryName}/${price}/${offset}/${size}`);
  }

  public getProductsByWord(word :  string , offset : number , size : number):Observable<PageProduct>{
    return this.http.get<PageProduct>(`${this.apiBaseUrl}/containsWord/${word}/${offset}/${size}`);
  }

  public addProduct(newproduct : FormData) : Observable<IProduct>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.post<IProduct>(`${this.apiBaseUrl}/add`,newproduct , options);
  }

  public updateProduct(product : IProduct) : Observable<IProduct>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.put<IProduct>(`${this.apiBaseUrl}/update`,product , options);
  }

  public deleteProduct(idproduct : number) : Observable<void>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${idproduct}` , options);
  }

  public getImage(product : any , num : number) : any{
    return (`${this.apiBaseUrl}/ImgProduct/${product?.idProduct}/${product?.images[num]?.idImage}`) ; 
  }

  products$ = this.getAllProducts() ;

  productsPage$ = this.getProductsByPage(0 , 6) ;

}
