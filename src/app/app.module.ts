import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { ColaboradorListComponent } from './colaborador/colaborador-list/colaborador-list.component';
import { FormColaboradorComponent } from './colaborador/form-colaborador/form-colaborador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { FormProductoComponent } from './producto/form-producto/form-producto.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriaListComponent,
    ColaboradorListComponent,
    FormColaboradorComponent,
    FormCategoriaComponent,
    FormProductoComponent,
    ProductoListComponent,
    LoginComponent,
    MainNavComponent,
    CustomersListComponent,
    CustomersFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
