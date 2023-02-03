import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  isLogin : boolean = true ;
  public loginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder , private router:Router , private userService : UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  login(){

    this.userService.login(this.loginForm.value.email , this.loginForm.value.password).subscribe(
      ( response : any  ) => {  
                               if(response.roles.includes('ADMIN')){
                                
                               this.userService.auth = true ;
                               localStorage.setItem("email" , this.loginForm.value.email) ;  
                               this.userService.user.account.email = this.loginForm.value.email ;
                               localStorage.setItem("accessToken" , response.accessToken ) ;  
                               localStorage.setItem("refreshToken" , response.refreshToken );
                               localStorage.setItem("Is" , "ADMIN" );
                               this.loginForm.reset();
                               this.router.navigate(['/admin/dashboard']);

                               }else{
                                 alert("you can't access") ;
                               }

    }, (err : HttpErrorResponse )=> {   alert('Something went wrong !!')
    });


  }

}
