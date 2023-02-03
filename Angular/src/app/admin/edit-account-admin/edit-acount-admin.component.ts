import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-acount-admin',
  templateUrl: './edit-acount-admin.component.html',
  styleUrls: ['./edit-acount-admin.component.scss']
})
export class EditAccountAdminComponent implements OnInit {

  constructor(private router :Router , private userService : UserService  ) { }
  
  admin : IUser ;

  editSettingGroup = new FormGroup ({});
  firstName :FormControl;
  lastName :FormControl;
  email : FormControl ;
  adresse : FormControl ;
  country : FormControl ;
  phone : FormControl ;

  ngOnInit(): void {

      this.admin = this.userService.user ;

    this.firstName = new FormControl(this.admin.firstName , Validators.required);
    this.lastName = new FormControl(this.admin.lastName , Validators.required);
    this.country = new FormControl(this.admin.country , Validators.required);
    this.phone = new FormControl(this.admin.phone , Validators.required);
    this.adresse = new FormControl(this.admin.adresse , Validators.required);
    this.email = new FormControl(this.admin.account.email , Validators.required);

    this.editSettingGroup = new FormGroup({
      firstName : this.firstName,
      lastName  : this.lastName ,
      adresse : this.adresse ,
      country : this.country ,
      phone : this.phone ,
      email: this.email 
    })
    
  }
  

  Edit(settingValue : any){

    this.userService.user.firstName = settingValue.firstName ;
    this.userService.user.lastName = settingValue.lastName ;
    this.userService.user.adresse = settingValue.adresse ;
    this.userService.user.phone = settingValue.phone ;
    this.userService.user.country = settingValue.country ;
    this.userService.user.account.email = settingValue.email ;
    
    this.userService.updateUser(this.userService.user).subscribe(
      (admin : IUser) => { alert("updated with success"); }
    )

    this.router.navigate(['admin/settings']);
  }

}
