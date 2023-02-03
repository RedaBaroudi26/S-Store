import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAccountGuard implements CanActivate {
  
    constructor(private userService : UserService , private router : Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn() ;
  }

  checkLoggedIn():boolean{

    if(this.userService.auth){
        return true ; 
    }

    this.router.navigate(['/login']); 
    return false ;
  
  }
  
}
