import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './client/footer/footer.component';
import { PageNotFoundComponent } from './client/page-not-found/page-not-found.component';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './client/product/product.component';
import { ProductsClientComponent } from './client/products/products.component';

import { NavbarComponent } from './client/navbar/navbar.component';
import { AccountComponent } from './client/account/account.component';
import { CartComponent } from './client/cart/cart.component';
import { EditAccountComponent } from './client/edit-account/edit-account.component';
import { HomeComponent } from './client/home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductsClientComponent,
    ProductComponent,
    NavbarComponent,
    AccountComponent,
    CartComponent,
    EditAccountComponent,
    HomeComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
