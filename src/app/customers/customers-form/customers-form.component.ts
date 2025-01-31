import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/interfaces/Customer';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  formGroupCustomer:FormGroup;

  customer: Customer = {} as Customer;

  rhSelect: any[] = ['RH +', 'RH -'];

  constructor(private fb:FormBuilder, private customerService:CustomersService) {
    this.formGroupCustomer = this.fb.group({});
   }

  ngOnInit(): void {
    this.formCustomer()
  }


  formCustomer(){

    this.formGroupCustomer = this.fb.group({
            id: [''],
            id_document: ['', Validators.required],
            name: ['', Validators.required],
            // image: ['',],
            // state: [1, Validators.required],
            // cargo: ['', Validators.required],
            create_at: [''],
            telephone: [''],
            address: [''],
            email: [''],
            blood_type: [''],
            eps: [''],
            date_birth: [],
            rh: ['']
    })

  }

  async getCustomerByDocument(document:string){

    this.customerService.findByDocument(document).subscribe(resp => this.customer = resp);
  }

  async createCustomer(){
    this.formGroupCustomer.value.state = this.formGroupCustomer.value.state ? 1 : 0;
    console.log(this.formGroupCustomer.value.state);




    if (this.formGroupCustomer?.valid) {


      await this.getCustomerByDocument(this.formGroupCustomer.value.id_document);

      console.log('this.customer', this.customer);

      // Registra en bd el nuevo colaborador
      // this.formGroupCustomer.value.image = this.imagenUser;
      this.customerService.addCustomer(this.formGroupCustomer.value as Customer).subscribe(response => {


        if (this.customer == null) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '¡Ya existe un colaborador con el mismo documento!',
            showConfirmButton: false,
            timer: 3000,
          })

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Usuario registrado satisfactoriamente!',
            showConfirmButton: false,
            timer: 3000,
          })

          window.location.reload();
        }

      });

    } else {

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El documento, nombre, apellido, usuario, contraseña, email y perfil son obligatorios',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  formReset(){
    this.formGroupCustomer.reset({
      rh: new FormControl('RH')
    });
  }

}
