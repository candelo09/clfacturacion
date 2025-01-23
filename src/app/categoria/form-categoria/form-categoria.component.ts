import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category';
import Swal from 'sweetalert2';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  formCategoria: FormGroup;

  constructor(private fb: FormBuilder, private category_service: CategoriaService) {
    this.formCategoria = this.fb.group({});
   }

  ngOnInit(): void {
    this.fromCategoriaCreate();
  }

  public fromCategoriaCreate(){
    this.formCategoria = this.fb.group({
      category : ['', Validators.required],
      id   : [''],
      creat_at : [],
      update_at : []
    })
  }

  public createCategoria(){

    if(this.formCategoria.valid){
      this.formCategoria.value['created_at'] = new Date;
      this.formCategoria.value['update_at'] = new Date;
      console.log(this.formCategoria);


      this.category_service.createCategory(this.formCategoria.value).subscribe(() => {

        Swal.fire({
          text  : 'Categoria registrada satisfactoriamente',
          icon  : 'success',
          showConfirmButton: false,
          timer : 2000

        }).then((result) =>{
          window.location.reload();
        });

      });
    }else{
      Swal.fire({
        text  : 'El campo es obligatorio',
        icon  : 'warning',
        showConfirmButton: false,
        timer : 2000

      })
    }

  }

  public getCategoriaById(categoria:Category){
    // console.log(categoria.category)

      this.formCategoria.patchValue({
        id   : categoria.id_category,
        category : categoria.category
      });
  }

  public updateCategory(){

    if(this.formCategoria.valid){
      this.formCategoria.value['update_at'] = new Date;
      this.category_service.updateCategory(this.formCategoria.value).subscribe((response) => {

        response = JSON.parse(JSON.stringify(response));

        Swal.fire({
          text  : 'Categoria modificada satisfactoriamente',
          icon  : 'success',
          showConfirmButton: false,
          timer : 2000

        }).then((result) =>{
          window.location.reload();
        });
      })
    }

  }

}
