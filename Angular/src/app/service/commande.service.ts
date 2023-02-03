import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommande } from '../model/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiBaseUrl = "http://localhost:8080/api/commande" ;

   

  constructor(private http : HttpClient) { }

  public getCommandesByAccount(idAccount : number):Observable<ICommande[]>{
   let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
       return this.http.get<ICommande[]>(`http://localhost:8080/api/account/commandes/${idAccount}` , options) ;
  }

  public getAllCommandes() : Observable<ICommande[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.get<ICommande[]>(`${this.apiBaseUrl}/all` , options);
  }

  public createCommande( newCommande : ICommande ) : Observable<ICommande>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.post<ICommande>(`${this.apiBaseUrl}/add`, newCommande , options);
  }

  public updateCommande(commande : ICommande) : Observable<ICommande>{ 
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.put<ICommande>(`${this.apiBaseUrl}/update`,commande , options);
  }

  public deleteCommande(idCommande : number) : Observable<void>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer "+localStorage.getItem("accessToken") ) 
     }; 
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${idCommande}` ,options);
  }
   

}
