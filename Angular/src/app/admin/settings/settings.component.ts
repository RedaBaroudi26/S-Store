
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
 
  // admin : IUser ; 

  user$ : Observable<IUser> ;
  
  constructor(private userService : UserService ) { }

  ngOnInit(): void {
    
   this.user$ =  this.userService.profile() ;

   this.user$.subscribe(
       (response : IUser) => {this.userService.user = response}
   )
   
  }
  
  
}
