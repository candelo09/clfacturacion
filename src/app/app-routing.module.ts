import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { ColaboradorListComponent } from './colaborador/colaborador-list/colaborador-list.component';
import { HomeComponent } from './home/home.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGuard } from './login/auth-guard.guard';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { MembershipListComponent } from './memberships/membership-list/membership-list.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainNavComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'category', component: CategoriaListComponent},
      {path: 'colaborador', component: ColaboradorListComponent},
      {path: 'producto', component: ProductoListComponent},
      {path: 'cliente', component: CustomersListComponent},
      {path: 'planes', component:MembershipListComponent},
      {path: 'pago', component:PaymentListComponent}
    ], canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
