
import { Component, OnInit, Output,EventEmitter, HostListener } from '@angular/core';
import { UserService } from '../../service/user.service';
import { navbarData } from './nav-data';


interface SideNavToggle{
  screenWidth : number ;
  collapsed : boolean; 
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  
})
export class SidenavComponent implements OnInit {
@Output() onToggleSideNav : EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData=navbarData;
  
  @HostListener('window:resiza',['$event'])
onResize(event:any){
  this.screenWidth=window.innerWidth;
  if(this.screenWidth<=768){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed : this.collapsed , screenWidth : this.screenWidth});
  }
}
  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
  }
  
  toggleCollapse(): void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed : this.collapsed , screenWidth : this.screenWidth});
  }
  closeSidenav(): void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed : this.collapsed , screenWidth : this.screenWidth});
  }

  constructor(private userService : UserService) { }


  logout(label : string){
     
    if(label == "Logout"){
      this.userService.user = null ;
      localStorage.clear() ;
    }
     
   
  }

}
