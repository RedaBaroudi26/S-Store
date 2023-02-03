import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './product/products.component';
import { HttpClientModule } from '@angular/common/http';
import { EditAccountAdminComponent } from './edit-account-admin/edit-acount-admin.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch:'full'},
  {path: 'login' , component : LoginComponent},
  {path: 'signup' , component : SignupComponent},
  {path: 'dashboard' , component : DashboardComponent , canActivate : [LoginGuard]},
  {path: 'category' , component : CategoryComponent , canActivate : [LoginGuard]},
  {path: 'products', component : ProductsComponent , canActivate : [LoginGuard]} ,
  {path: 'settings' , component : SettingsComponent , canActivate : [LoginGuard]},
  {path: 'editAccountAdmin', component : EditAccountAdminComponent , canActivate : [LoginGuard]}
];

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    CategoryComponent,
    SignupComponent ,
    LoginComponent ,
    EditAccountAdminComponent ,
    SettingsComponent
  ],
  imports: [
    CommonModule ,
    RouterModule.forChild(routes) ,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
