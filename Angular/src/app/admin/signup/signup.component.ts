import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public signupForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private userService : UserService , private router:Router) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      adresse:['',Validators.required] ,
      country : ['',Validators.required] ,
      phone : ['' , Validators.required] ,
      email : ['' , Validators.required] ,
      password : ['' , Validators.required] ,
    })

  }

  singUp(){

    let newUser : IUser = {
      idUser: null ,
      firstName: this.signupForm.controls['firstName'].value ,
      lastName: this.signupForm.controls['lastName'].value,
      adresse: this.signupForm.controls['adresse'].value ,
      country: this.signupForm.controls['country'].value ,
      phone: this.signupForm.controls['phone'].value ,
      account: {
          idAccount : null ,
          email : this.signupForm.controls['email'].value ,
          password : this.signupForm.controls['password'].value ,
          dateCreation : new Date(),
          roles : [{idRole : 2 ,  roleName : ""}] ,
          commandes : []
      }
    } ;

     this.userService.createUser(newUser).subscribe(
      res => { alert("signup successfull") ;  this.signupForm.reset(); this.router.navigate(['/admin/login']); } ,
      err => { alert('Something went wrong') ; console.log(err)}
      ); 

   //  alert(new Date('yyyy-mm-dd'));

  }

}
