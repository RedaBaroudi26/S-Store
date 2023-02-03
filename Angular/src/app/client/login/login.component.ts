import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from '../../service/user.service';

declare const myTest : any ;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService , private router : Router ) { }

  LoginGroup : FormGroup = new FormGroup({});
  email : FormControl ;
  password : FormControl ;
  error : string ;

  ngOnInit(): void {
    myTest();

    this.email = new FormControl('' , [ Validators.required , Validators.email]) ;
    this.password = new FormControl('' , Validators.required) ;

    this.LoginGroup = new FormGroup({
       email : this.email ,
       password : this.password 
    })

  }


  login(LoginValue : any ){

    this.userService.login(LoginValue.email , LoginValue.password).subscribe(
      ( response : any )=>{

          localStorage.setItem("email" , LoginValue.email);
          localStorage.setItem("accessToken" , response.accessToken) ;  
          localStorage.setItem("refreshToken" , response.refreshToken);
          
          this.getInfo();
          this.userService.auth = true ;

      }, (err : HttpErrorResponse ) => {
        alert('Something went wrong !!');
        this.error = "email or password wrong" ;
      })

  }

  getInfo(){
    this.userService.profile().subscribe(
      (response : IUser) => {
                   this.userService.user = response ;
                   this.router.navigate(['/Home']);
                 //  console.log(this.userService.user) ;
      } , error => {
         console.log(error) ;
      }
    )
  }
  

}
