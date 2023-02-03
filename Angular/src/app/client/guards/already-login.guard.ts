import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoginGuard implements CanActivate {

  constructor(private userService: UserService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.userService.auth){
         this.checkAuth() ;
      }
      
    return true;
  }

  checkAuth(){
    if( localStorage.getItem("accessToken") && localStorage.getItem("refreshToken") && localStorage.getItem("refreshToken") ){
         this.userService.profile().subscribe(
            (response : IUser) => { this.userService.user = response ; this.userService.auth = true ; console.log("executed") } ,
            (error :  HttpErrorResponse ) => { 
                                               if(localStorage.getItem("refreshToken")){
                                                 this.userService.refreshToken().subscribe(
                                                   (response : any ) => {
                                                          localStorage.removeItem("accessToken") ;
                                                          localStorage.removeItem("refreshToken") ;
                                                         
                                                          localStorage.setItem("accessToken" , response.accessToken) ;  
                                                          localStorage.setItem("refreshToken" , response.refreshToken);

                                                          this.userService.profile().subscribe(
                                                            (response  : IUser)=> {this.userService.user = response ; this.userService.auth = true } ,
                                                            (error : any ) => { console.log( "can't connected  statut  : " , error.status , " message :  " , error.message) ;  }
                                                           )
                                                   }
                                                 )
                                               }
                                             }
         )
    }
  }

}
