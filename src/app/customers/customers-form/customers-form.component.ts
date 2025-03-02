import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomersService } from '../customers.service';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/interfaces/Customer';
import { lastValueFrom, Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  formCustomer: FormGroup;

  customer: Customer = {} as Customer;

  rhSelect: any[] = ['RH +', 'RH -'];

  constructor(private fb: FormBuilder, private customerService: CustomersService) {
    this.formCustomer = this.fb.group({});
  }

  ngOnInit(): void {
    this.form_customer()
  }


  form_customer() {

    this.formCustomer = this.fb.group({
      id: [''],
      document: ['', Validators.required],
      name: ['', Validators.required],
      // image: ['',],
      state: ['', Validators.required],
      // cargo: ['', Validators.required],
      create_at: [''],
      phone: [''],
      address: [''],
      email: [''],
      blood_type: [''],
      eps: [''],
      date_birth: [],
      rh: [],
      last_purchase:[''],
      update_at: ['']
    })

  }

  async getCustomerByDocument(document: string) {

    return await lastValueFrom(this.customerService.findByDocument(document)).then();

  }

  async createCustomer() {

    this.formCustomer.value.state = this.formCustomer.value.state ? 1 : 0;



    this.formCustomer.value.blood_type = this.formCustomer.value.blood_type + ' ' + this.formCustomer.value.rh

    // console.log(this.formCustomer.value.blood_type);


    // this.customer = await this.getCustomerByDocument(this.formCustomer.value.document);

    if (this.formCustomer?.valid) {



      this.formCustomer.value.blood_type = `${this.formCustomer.value.blood_type} ${this.formCustomer.value.rh}`



      // Registra en bd el nuevo colaborador
      // this.formCustomer.value.image = this.imagenUser;
      return await lastValueFrom(this.customerService.addCustomer(this.formCustomer.value as Customer)).then(async () => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Usuario registrado satisfactoriamente!',
          showConfirmButton: false,
          timer: 3000,
        }).then((resp) =>{
            window.location.reload();
        })



      }).catch(resp => {
        if (resp.error.indexOf('Llave duplicada')) {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `¡Ya existe un colaborador con el mismo documento`,
            showConfirmButton: false,
            timer: 3000,
          })
        }else{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${resp.error}`,
          showConfirmButton: false,
          timer: 3000,
        })
        }
        console.log('resp error', resp);

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

  getCustomerById(customer:Customer){

    // console.log('customer ', customer);

    var blood_type_tem = customer.blood_type.split(' ');

    var rhTemp = blood_type_tem[1] + ' ' + blood_type_tem[2]

    // console.log('blood_type_tem ', blood_type_tem[0]);
    // console.log('rhTemp ', rhTemp);


    var last_purchase_temp = customer.last_purchase.toString().split('T');

    var create_at_temp = customer.create_at.toString().split('T');

    this.formCustomer.patchValue({
      id: customer.id,
      document: customer.document,
      name: customer.name,
      // image: ['',],
      state: 1,
      // cargo: ['', Validators.required],
      create_at: new Date(create_at_temp[0]),
      phone: customer.phone,
      address: customer.address,
      email: customer.email,
      blood_type: blood_type_tem[0],
      eps: customer.eps,
      date_birth: formatDate(customer.date_birth, 'YYYY-MM-dd','en-US','GMT-5'),
      rh: rhTemp,
      last_purchase: new Date(last_purchase_temp[0]),
      update_at: new Date()
    });

  }

  async updateCustomer(){

    this.formCustomer.value.state = this.formCustomer.value.state ? 1 : 0;

    if (this.formCustomer?.valid) {

      this.formCustomer.value.date_birth = formatDate(this.formCustomer.value.date_birth, 'YYYY-MM-dd','en-US','GMT-5')

      this.formCustomer.value.update_at = new Date();

      this.formCustomer.value.blood_type = `${this.formCustomer.value.blood_type} ${this.formCustomer.value.rh}`
      // Registra en bd el nuevo colaborador
      // this.formCustomer.value.image = this.imagenUser;
      return await lastValueFrom(this.customerService.updateCustomer(this.formCustomer.value as Customer)).then(async () => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Usuario modificado satisfactoriamente!',
          showConfirmButton: false,
          timer: 3000,
        }).then((resp) => {
          window.location.reload();
        })



      }).catch(resp => {
        console.log(resp.error);;

        if (resp.error.indexOf('Llave duplicada')) {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `¡Ya existe un colaborador con el mismo documento`,
            showConfirmButton: false,
            timer: 3000,
          })
        }else{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${resp.error}`,
          showConfirmButton: false,
          timer: 3000,
        })
        }
        console.log('resp error', resp);

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

  formReset() {
    this.formCustomer.reset({});

    console.log('this.rhSelect ',this.rhSelect);


    // this.formCustomer.patchValue({
    //   rh: this.rhSelect
    // })
  }


}
