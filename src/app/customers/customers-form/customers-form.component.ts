import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomersService } from '../customers.service';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/interfaces/Customer';
import { lastValueFrom, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { PhysicalProgress } from 'src/app/interfaces/PhysicalProgress';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  formCustomer: FormGroup;
  // formPhysicalProgress: FormGroup;

  customer: Customer = {} as Customer;

  rhSelect: any[] = ['RH +', 'RH -'];

  showInputs: any = {
    cuello: false,
    hombros: false,
    pecho: false,
    abdomen: false,
    cintura: false,
    cadera: false,
    brazo: false,
    antebrazo: false,
    muslo: false,
    pantorrilla: false
    // puedes añadir más
  };

  medidas = {
    cuello: null,
    hombros: null,
    pecho: null,
    abdomen: null,
    cintura: null,
    cadera: null,
    brazo: null,
    antebrazo: null,
    muslo: null,
    pantorrilla: null
  };

  gender: any = {
    M: false,
    F: false,
    ND: false,
  }

  flagAlertImc: boolean = false;


  constructor(private fb: FormBuilder, private customerService: CustomersService) {
    this.formCustomer = this.fb.group({});
    // this.formPhysicalProgress = this.fb.group({});
  }

  ngOnInit(): void {
    this.form_customer();
    // this.form_physicalProgress();
  }


  form_customer() {

    this.formCustomer = this.fb.group({
      id: [''],
      document: ['', Validators.required],
      name: ['', Validators.required],
      // image: ['',],
      state: [1, Validators.required],
      // cargo: ['', Validators.required],
      create_at: [''],
      phone: [''],
      address: [''],
      email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      blood_type: [''],
      eps: [''],
      date_birth: [],
      rh: [],
      last_purchase: [''],
      update_at: [''],
      stature: [''],
      weight: [''],
      body_fat: [0.00],
      musculature: [''],
      calf_circumference: [''],
      average_arm_muscle_circumference: [''],
      belt_circumference: [''],
      hip_circumference: [''],
      thigh_circumference: [''],
      relaxed_arm_circumference: [''],
      circumference_contracted_arm: [''],
      neck: [0.00],
      neckTemp: [0],
      waist: [0.00],
      waistTemp: [0],
      hips: [0.00],
      hipsTemp: [0],
      imc: [],
      gender: [''],
      cardiobascular: [0.00],
      abdominalObesity: [0.00],
      corporalAdiposity: [0.00]

    })

  }

  get email() {
    return this.formCustomer.get('email');
  }

  // form_physicalProgress(){

  //   this.formPhysicalProgress = this.fb.group({
  //     id: [''],
  //     stature:[''],
  //     weight:[''],
  //     body_fat: [''],
  //     musculature: [''],
  //     calf_circumference: [''],
  //     average_arm_muscle_circumference: [''],
  //     belt_circumference: [''],
  //     hip_circumference: [''],
  //     thigh_circumference: [''],
  //     relaxed_arm_circumference: [''],
  //     circumference_contracted_arm: ['']

  //   })

  // }

  async getCustomerByDocument(document: string) {

    return await lastValueFrom(this.customerService.findByDocument(document)).then();

  }

  async createCustomer() {

    this.formCustomer.value.state = this.formCustomer.value.state ? 1 : 0;



    // this.formCustomer.value.blood_type = this.formCustomer.value.blood_type + ' ' + this.formCustomer.value.rh

    console.log(this.formCustomer.value);


    // this.customer = await this.getCustomerByDocument(this.formCustomer.value.document);

    if (this.formCustomer?.valid) {



      this.formCustomer.value.blood_type = `${this.formCustomer.value.blood_type} ${this.formCustomer.value.rh.replace('RH', '')}`



      // Registra en bd el nuevo colaborador
      // this.formCustomer.value.image = this.imagenUser;
      return await lastValueFrom(this.customerService.addCustomer(this.formCustomer.value as Customer)).then(async (respCustomer) => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente registrado satisfactoriamente!',
          showConfirmButton: false,
          timer: 3000,
        }).then((resp) => {
          this.createPhyisicalProgress(this.formCustomer.value, respCustomer)
          window.location.reload();
        })



      }).catch(resp => {
        if (resp.error.indexOf('Llave duplicada')) {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `¡Ya existe un cliente con el mismo documento`,
            showConfirmButton: false,
            timer: 3000,
          })
        } else {

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

  public async createPhyisicalProgress(bodyPhysicalProgress: any, customer: Customer) {
    console.log('customer ', customer);



    // const customer_temp:Customer = {
    //   id: 0,
    //   name: customer.name,
    //   document:customer.document,
    //   email: customer.email,
    //   phone: customer.phone,
    //   address: customer.address,
    //   date_birth: customer.date_birth,
    //   purchases: 0,
    //   last_purchase: new Date(),
    //   create_at: customer.create_at,
    //   update_at: customer.update_at,
    //   blood_type: customer.blood_type,
    //   eps: customer.eps,
    //   state: customer.state
    // }


    const bodyPhysicalProgress_temp: PhysicalProgress = {
      id_user: null,
      weight: bodyPhysicalProgress.weight,
      body_fat: bodyPhysicalProgress.body_fat,
      musculature: bodyPhysicalProgress.musculature,
      id_customer: customer,
      stature: bodyPhysicalProgress.stature,
      id: 0,
      neck: 0,
      shoulders: 0,
      chest: 0,
      abdomen: 0,
      waist: 0,
      hips: 0,
      biceps: 0,
      forearm: 0,
      thigh: 0,
      calf: 0,
      progress_date: new Date()
    }




    // return await lastValueFrom(this.customerService.addPhysicalProgress(bodyPhysicalProgress_temp));

  }

  getCustomerById(customer: Customer) {

    // console.log('customer ', customer);

    var blood_type_tem = customer.blood_type.split(' ');

    var rhTemp = blood_type_tem[1] + ' ' + blood_type_tem[2]

    // console.log('blood_type_tem ', blood_type_tem[0]);
    // console.log('rhTemp ', rhTemp);


    var last_purchase_temp = customer.last_purchase != null ? customer.last_purchase.toString().split('T') : '';

    var create_at_temp = customer.create_at != null ? customer.create_at.toString().split('T') : '';

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
      date_birth: formatDate(customer.date_birth, 'YYYY-MM-dd', 'en-US', 'GMT-5'),
      rh: rhTemp,
      last_purchase: new Date(last_purchase_temp[0]),
      update_at: new Date()
    });

  }

  async updateCustomer() {

    this.formCustomer.value.state = this.formCustomer.value.state ? 1 : 0;

    if (this.formCustomer?.valid) {

      this.formCustomer.value.date_birth = formatDate(this.formCustomer.value.date_birth, 'YYYY-MM-dd', 'en-US', 'GMT-5')

      this.formCustomer.value.update_at = new Date();

      this.formCustomer.value.blood_type = `${this.formCustomer.value.blood_type} ${this.formCustomer.value.rh}`
      // Registra en bd el nuevo colaborador
      // this.formCustomer.value.image = this.imagenUser;
      return await lastValueFrom(this.customerService.updateCustomer(this.formCustomer.value as Customer)).then(async () => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Cliente modificado satisfactoriamente!',
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
            title: `¡Ya existe un cliente con el mismo documento`,
            showConfirmButton: false,
            timer: 3000,
          })
        } else {

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

    // console.log('this.rhSelect ',this.rhSelect);


    // this.formCustomer.patchValue({
    //   rh: this.rhSelect
    // })
  }

  measure(perimeters: string) {
    console.log('perimeters ', perimeters);

    this.showInputs[perimeters] = !this.showInputs[perimeters];



  }

  inputPerimeters(perimeters: string) {

    // this.showInputs[perimeters] = false;

    const body_fat_tempM = this.showInputs['cuello'] && this.showInputs['cintura'] ? (8.6010 * Math.log10(this.formCustomer.value.waistTemp - this.formCustomer.value.neckTemp) - 7.0041 * Math.log10(this.formCustomer.value.stature) + 3.676) : 0;

    const body_fat_tempF = this.showInputs['cuello'] && this.showInputs['cintura'] && this.showInputs['cadera'] && this.showInputs['cadera'] ? (16.3205 * Math.log10(this.formCustomer.value.waistTemp + this.formCustomer.value.hipsTemp - this.formCustomer.value.neckTemp) - 9.7684 * Math.log10(this.formCustomer.value.stature) - 7.8387) : 0;

    this.formCustomer.patchValue({
      neck: this.formCustomer.value.neckTemp,
      waist: this.formCustomer.value.waistTemp,
      hips: this.formCustomer.value.hipsTemp,
      cardiobascular: this.showInputs['cadera'] ? (this.formCustomer.value.waistTemp / this.formCustomer.value.hipsTemp).toFixed(2) : 0,
      abdominalObesity: this.formCustomer.value.stature != 0 ? (this.formCustomer.value.waistTemp / (this.formCustomer.value.stature * 100)).toFixed(2) : 0,
      body_fat: (this.formCustomer.value.gender == 'M' || this.formCustomer.value.gender['ND'])
        ? body_fat_tempM.toFixed(2)
        : body_fat_tempF.toFixed(2),
      corporalAdiposity : this.formCustomer.value.stature != 0 ? ((this.formCustomer.value.waistTemp / Math.pow((this.formCustomer.value.stature), 1.5)) - 18).toFixed(2) : 0
    })


  }

  calculateImc() {


    if (this.formCustomer.value.stature > 0) {
      this.inputPerimeters('');
      this.formCustomer.patchValue({
        imc: (this.formCustomer.value.weight / Math.pow(this.formCustomer.value.stature, 2)).toFixed(2)
      })
      this.flagAlertImc = false;
    } else {

      this.flagAlertImc = true;

    }


  }

  selectGender() {

    this.gender = {};

    console.log(this.formCustomer.value.gender);

    this.gender[this.formCustomer.value.gender] = !this.gender[this.formCustomer.value.gender];

    // console.log('this.gender ', this.gender);


  }

  validateGender() {

    if (!this.gender[this.formCustomer.value.gender] || this.formCustomer.value.gender == "") {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: `Es importante elegir el genero, antes de las medidades iniciales.`,
        showConfirmButton: false,
        timer: 1500,
      })
    }


  }



}
