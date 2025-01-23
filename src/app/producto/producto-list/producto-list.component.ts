import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/Producto';
import { ProductService } from '../producto.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  productos:Product[] = [];

  productoVerMas:Product = {} as Product;

  productViewMoreCategory = "";

  @ViewChild(FormProductoComponent) addProduct !: FormProductoComponent;

  constructor(private productService: ProductService, private utilService:UtilsService) { }

  ngOnInit(): void {

    this.getAllProducts();
  }


  public getAllProducts(){
    this.productService.getProducts().subscribe(response => {
      this.productos = response;
      console.log("this.productos ",this.productos);

    });
  }

  public seeAll(producto: Product){

    this.productoVerMas = producto;

    this.productViewMoreCategory = producto.category.category

  }

  public getProductoById(producto: Product){

    this.addProduct.getProductById(producto);


  }

    public deleteProduct(producto: Product) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(producto).subscribe({
            next: resp => { this.utilService.messageAlert('El producto ha sido eliminada', 'En hora buena!', 'success')},

            error: e => {
              console.log(e.error);
              this.utilService.messageAlert(e.error, 'Lo sentimos! :(', 'warning')


            }
          });

        }


      })
    }

}
