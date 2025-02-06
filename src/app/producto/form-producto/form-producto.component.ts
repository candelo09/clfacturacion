import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { Category } from 'src/app/interfaces/Category';
import { ProductService } from '../producto.service';
import Swal from 'sweetalert2';
import { Product } from 'src/app/interfaces/Producto';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  formProducto: FormGroup;

  categorias: Category[] = [];

  category: Category = {} as Category

  validateFormProduct = true;

  constructor(private fb: UntypedFormBuilder, private product_service: ProductService, private category_service: CategoriaService) {
    this.formProducto = this.fb.group({});
  }

  ngOnInit(): void {
    this.formProductoCreate();
    this.getCategorias();
  }

  public formProductoCreate() {
    this.formProducto = this.fb.group({
      id: ['', []],
      code_prod: ['', Validators.required],
      description: ['', Validators.required],
      purchase_price: ['', Validators.required],
      sales_price: ['', Validators.required],
      expire_date: [''],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      created_at: [],

    })
  }


  public getCategorias() {
    this.category_service.getCategory().subscribe(response => this.categorias = response);
  }

  public selectCategory() {
    this.categorias.filter(resp => {
      resp.category == this.formProducto.value.category ? this.category = resp : ""

    })

  }

  public createProducto() {
    this.formProducto.value['created_at'] = new Date();

    this.formProducto.value.category = this.category

    console.log("this.formProducto ", this.formProducto);

    if (this.formProducto.valid) {

      this.product_service.createProduct(this.formProducto.value as Product).subscribe(response => console.log(response));

      Swal.fire({
        text: 'Producto registrado satisfactoriamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000

      }).then((result) => {
        window.location.reload();
      });
      this.validateFormProduct = true;
    } else {
      Swal.fire({
        text: 'Verifica los campos obligatorios',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000

      })
      this.validateFormProduct = false;
    }

  }


  public getProductById(product:Product){

    // console.log('product.category.id ',product.category.id_category);


      this.category = product.category;


    this.formProducto.patchValue({
      id: product.id,
      code_prod: product.code_prod,
      description: product.description,
      purchase_price: product.purchase_price,
      sales_price: product.sales_price,
      expire_date: product.expire_date,
      stock: product.stock,
      category: product.category.category,
      created_at: product.create_at,
    })

  }

  public editProduct(){

    // console.log('this.category.id_category ',this.category.id_category);

    // this.formProducto.value['created_at'] = new Date();

    this.formProducto.value.category = this.category
    console.log("this.formProducto.value ", this.formProducto.value);
    if (this.formProducto.valid) {

      this.product_service.editProduct(this.formProducto.value as Product).subscribe(response => console.log(response));

      Swal.fire({
        text: 'Producto modificado satisfactoriamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000

      }).then((result) => {

        window.location.reload();

      });
      this.validateFormProduct = true;
    } else {
      Swal.fire({
        text: 'Verifica los campos obligatorios',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000

      })
      this.validateFormProduct = false;
    }

  }

}
