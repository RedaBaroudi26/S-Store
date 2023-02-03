import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { PageNotFoundComponent } from './client/page-not-found/page-not-found.component';
import { ProductComponent } from './client/product/product.component';
import { ProductsClientComponent } from './client/products/products.component';
import { EditAccountComponent } from './client/edit-account/edit-account.component';
import { CartComponent } from './client/cart/cart.component';
import { AccountComponent } from './client/account/account.component';
import { HomeComponent } from './client/home/home.component';
import { ClientAccountGuard } from './client/guards/client-account.guard';
import { RegisterGuard } from './client/guards/register-guard.guard';
import { AlreadyLoginGuard } from './client/guards/already-login.guard';

const routes: Routes = [

  { path : 'Home' , component : HomeComponent , canActivate : [AlreadyLoginGuard] } ,
  { path : 'login' , component : LoginComponent , canActivate : [RegisterGuard] } ,
  { path : 'register' , component : RegisterComponent , canActivate : [RegisterGuard] } ,
  { path : 'products' , component : ProductsClientComponent } ,
  { path : 'product/:id' , component : ProductComponent } ,
  { path : 'account' , component : AccountComponent , canActivate : [ClientAccountGuard] } ,
  { path : 'editAccount' , component : EditAccountComponent , canActivate : [ClientAccountGuard] } ,
  { path : 'cart' , component : CartComponent , canActivate : [ClientAccountGuard] } ,
  { path : 'admin' , loadChildren : () => import("./admin/admin.module").then(m => m.AdminModule) },
  { path: '', redirectTo: 'Home', pathMatch: 'full' } ,
  { path: '**', component: PageNotFoundComponent } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
