import { Component, OnInit } from '@angular/core';
import { IUser } from '../../model/user';
import { UserService } from '../../service/user.service';

declare const myTest : any ;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {  

  constructor(private userService : UserService) { }

  user : IUser ;

  ngOnInit(): void {
    
    myTest() ;
       
    this.user = this.userService.user ;
    
  }

}
