import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {


  constructor(private userService : UserService , private router : Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(!this.Authentificated()){
          this.router.navigate(['/admin/login'])
      } 
      
      return this.userService.auth ;  
    }
  


  Authentificated():boolean{
  
     if( localStorage.getItem("accessToken") && localStorage.getItem("email") && localStorage.getItem("Is") == "ADMIN" ){
         this.userService.auth = true ;
         this.userService.user.account.email = localStorage.getItem("email" ) ;  
     }

     return this.userService.auth ;
  }


}
