import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria/categoria.service';
import { ProductService } from '../producto/producto.service';
import { CustomersService } from '../customers/customers.service';
import { MembershipService } from '../memberships/membership.service';
import { PaymentService } from '../payments/payment.service';
import { ColaboradorService } from '../colaborador/colaborador.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryAll = 0;
  productAll = 0;
  customerAll = 0;
  planesAll = 0;
  paymentsAll= 0;
  usersAll= 0 ;

  constructor(
    private categoryService: CategoriaService,
    private productService: ProductService,
    private customerService: CustomersService,
    private planesServices: MembershipService,
    private paymentsServices: PaymentService,
    private userServices: ColaboradorService) { }

  ngOnInit(): void {
    this.categoryTotal();
    this.productTotal();
    this.customerotal();
    this.usersTotal();
    this.planesTotal();
    this.paymentsTotal();
  }

  categoryTotal(){

    this.categoryService.getCategory().subscribe(resp => this.categoryAll = resp.length);

  }

  productTotal(){

    this.productService.getProducts().subscribe(resp => this.productAll = resp.length);

  }

  customerotal(){

    this.customerService.getAllCustomers().subscribe(resp => this.customerAll = resp.length);

  }

  usersTotal(){
    this.userServices.getAllUsers().subscribe(resp => this.usersAll = resp.length);
  }

  planesTotal(){
    this.planesServices.getAllMembership().subscribe(resp => this.planesAll = resp.length)
  }

  paymentsTotal(){
    this.paymentsServices.getAllPayment().subscribe(resp => this.paymentsAll = resp.length);
  }


}
