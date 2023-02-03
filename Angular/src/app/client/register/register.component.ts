import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAccount } from '../../model/account';
import { IUser } from '../../model/user' ;
import { UserService } from '../../service/user.service';

declare const myTest : any ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  existEmail : boolean = false ;


  constructor(private userService : UserService , private router : Router) { }

  newAccountForm : FormGroup = new FormGroup({}) ;
  firstName : FormControl ;
  lastName : FormControl ;
  Email : FormControl ;
  password : FormControl ;

  ngOnInit(): void {
    
    myTest();

     this.firstName = new FormControl('' , Validators.required );
     this.lastName = new FormControl('' , Validators.required ) ;
     this.Email =  new FormControl('' , [Validators.required , Validators.email] ) ;
     this.password =  new FormControl('' , [Validators.required , Validators.minLength(8)] ) ;
     
     this.newAccountForm = new FormGroup({
        firstName : this.firstName ,
        lastName : this.lastName ,
        Email : this.Email ,
        password : this.password 
     })

  }


  saveAccount(FormValue : any ){

          let newAccount : IAccount = {
            email: FormValue.Email,
            password: FormValue.password,
            dateCreation : new Date() ,
            roles : [{idRole : 1 , roleName : "USER"}] ,
            idAccount : null , 
            commandes : null 
          }

          let newClient : IUser = {
            firstName: FormValue.firstName,
            lastName: FormValue.lastName,
            account : newAccount ,
            idUser: null ,
            adresse: '',
            country: '',
            phone: ''
          };

        this.userService.createUser(newClient).subscribe(
          (res : IUser ) => { this.userService.user = res ; this.router.navigate(['/login']);}
        );

  } 


  emailFound(email : string)  {
     
     this.userService.checkEmail(email).subscribe(
            ( response : boolean ) =>  { this.existEmail = response } , 
            ( error : HttpErrorResponse ) => { alert(error.message) } 
     );
       
  }
  



}
