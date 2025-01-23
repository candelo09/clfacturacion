import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria/categoria.service';
import { ProductService } from '../producto/producto.service';
import { CustomersService } from '../customers/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryAll = 0;
  productAll = 0;
  customerAll = 0;

  constructor(
    private categoryService: CategoriaService,
    private productService: ProductService,
    private customerService: CustomersService) { }

  ngOnInit(): void {
    this.categoryTotal();
    this.productTotal();
    this.customerotal();
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


}
