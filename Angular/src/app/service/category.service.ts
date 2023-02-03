import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiBaseUrl = "http://localhost:8080/api/category" ;



  constructor(private http : HttpClient) { }

  public getAllCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${this.apiBaseUrl}/all`);
  }

  public addCategory(newCategory : ICategory) : Observable<ICategory>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.post<ICategory>(`${this.apiBaseUrl}/add`,newCategory , options);
  }

  public updateCategory(category : ICategory) : Observable<ICategory>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.put<ICategory>(`${this.apiBaseUrl}/update`,category , options);
  }

  public deleteCategory(idCategoory : number) : Observable<void>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${idCategoory}` , options);
  }

  categories$ : Observable<ICategory[]> =  this.getAllCategories();

}
