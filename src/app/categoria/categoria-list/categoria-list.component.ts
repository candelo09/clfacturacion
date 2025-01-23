import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';
import Swal from 'sweetalert2';
import { CategoriaService } from '../categoria.service';
import { FormCategoriaComponent } from '../form-categoria/form-categoria.component';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categories: Category[] = [];

  @ViewChild(FormCategoriaComponent) addCategoria !: FormCategoriaComponent;

  constructor(private categoriaService: CategoriaService, private utilService:UtilsService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  //Get of the categories
  public getAllCategories() {
    this.categoriaService.getCategory().subscribe(response => {
      this.categories = response
    });
  }

  public getCategoriaById(categoria: Category) {
    this.addCategoria.getCategoriaById(categoria);
  }

  public deleteCategory(id: number) {
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
        this.categoriaService.deleteByIdCategory(id).subscribe({
          next: resp => { this.utilService.messageAlert('La categoria ha sido eliminada', 'En hora buena!', 'success')},

          error: e => {
            console.log(e.error);
            this.utilService.messageAlert(e.error, 'Lo sentimos! :(', 'warning')


          }
        });

      }


    })
  }

}
