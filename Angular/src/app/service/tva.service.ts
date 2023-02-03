import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITva } from 'src/app/model/Tva';

@Injectable({
  providedIn: 'root'
})
export class TvaService {

  private apiBaseUrl = "http://localhost:8080/api/tva" ;

  constructor(private http : HttpClient) { }

  public getAllTvas() : Observable<ITva[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.get<ITva[]>(`${this.apiBaseUrl}/all` , options);
  }

  public addTva(newTva : ITva) : Observable<ITva>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.post<ITva>(`${this.apiBaseUrl}/add`,newTva , options);
  }

  public updateTva(tva : ITva) : Observable<ITva>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.put<ITva>(`${this.apiBaseUrl}/update`,tva , options);
  }

  public deleteTva(idTva : number) : Observable<void>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${idTva}` , options);
  }

}