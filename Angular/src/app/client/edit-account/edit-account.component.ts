import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../model/user';
import { UserService } from '../../service/user.service';

declare const myTest : any ;

@Component({
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  constructor(private router : Router , private userService : UserService) { }

  user : IUser ;

  editAccountGroup = new FormGroup({}) ;
  firstName : FormControl ;
  lastName : FormControl;
  adresse : FormControl;
  email : FormControl;
  country : FormControl;
  phone : FormControl;

  ngOnInit(): void {
    
    myTest() ;

    this.user = this.userService.user ;

    this.firstName = new FormControl(this.user.firstName , Validators.required) ;
    this.lastName = new FormControl(this.user.lastName , Validators.required) ;
    this.adresse = new FormControl(this.user.adresse , Validators.required) ;
    this.email = new FormControl(this.user.account.email , [Validators.required , Validators.email]) ;
    this.phone = new FormControl(this.user.phone , Validators.required) ;
    this.country = new FormControl(this.user.country , Validators.required) ;

    this.editAccountGroup = new FormGroup({
       firstName :  this.firstName ,
       lastName : this.lastName ,
       adresse : this.adresse ,
       email :  this.email ,
       phone : this.phone ,
       country : this.country
    })

  }

  Edit(accountValue : any){
     // console.log(accountValue);
     this.user.firstName =  accountValue.firstName ;
     this.user.lastName =  accountValue.lastName ;
     this.user.adresse =  accountValue.adresse ;
     this.user.account.email =  accountValue.email ;
     this.user.phone =  accountValue.phone ;
     this.user.country =  accountValue.country ;

     this.userService.user = this.user ;

     this.userService.updateUser(this.user).subscribe(
          (response : IUser) => { this.router.navigate(['/account']); } ,
          (error) => { console.log(error) }
     )
     
  }
  

}
