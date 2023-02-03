import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = "http://localhost:8080/api/user" ;

  auth : boolean = false ;

  user : IUser = {
    idUser: null ,
    firstName: null ,
    lastName: null ,
    adresse: null ,
    country: null ,
    phone: null ,
    account: {
      idAccount: null,
      email: null ,
      password: null ,
      dateCreation : null , 
      commandes: null ,
      roles: null 
    }
  } ;

  constructor(private http : HttpClient) { }

  public login(email : string , password : string) : any{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);
    return this.http.post<any>(`http://localhost:8080/login` , body , options);
  }

  public createUser( newClient : IUser ) : Observable<IUser>{
    return this.http.post<IUser>(`${this.apiBaseUrl}/add`, newClient);
  }

  public getAllUsers() : Observable<IUser[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("accessToken") ) 
    } ; 
    return this.http.get<IUser[]>(`${this.apiBaseUrl}/all` , options);
  }

  public updateUser(user : IUser) : Observable<IUser>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("accessToken") ) 
    } ; 
    return this.http.put<IUser>(`${this.apiBaseUrl}/update`,user , options);
  }

  public deleteUser(idUser : number) : Observable<void>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("accessToken") ) 
    } ; 
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${idUser}` , options);
  }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiBaseUrl}/checkEmail/${email}`);
  }

  public hasRole(): Observable<boolean> {
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("accessToken") ) 
    } ; 
    let email = localStorage.getItem("email") ;
    return this.http.get<boolean>(`${this.apiBaseUrl}/hasRole/${email}/ADMIN` , options);
  }

  public profile() : Observable<IUser>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("accessToken") ) 
    } ; 

    let email = localStorage.getItem("email") ;
     return this.http.get<IUser>(`${this.apiBaseUrl}/profile/${email}` , options) ;
  }

  public refreshToken(): Observable<any>{
    let options = {
      headers: new HttpHeaders().set('Authorization' , "Bearer " + localStorage.getItem("refreshToken") ) 
    } ; 
    return this.http.get<any>(`http://localhost:8080/home/refreshToken` , options);
 }

}
