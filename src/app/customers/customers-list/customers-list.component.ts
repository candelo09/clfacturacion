import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer, CustomerInfoAdi } from 'src/app/interfaces/Customer';
import { CustomersFormComponent } from '../customers-form/customers-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Customer[] = [];
  customerViewMore: CustomerInfoAdi = {} as CustomerInfoAdi;
  customersDataHistory: CustomerInfoAdi[] = [];

  statusPlan = false;
  showTableInfoAdi = false;


  @ViewChild(CustomersFormComponent) addCustomer !: CustomersFormComponent;

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Get all Customeres
  public getAllUsers() {
    this.customerService.getAllCustomers().subscribe(response => {
      // console.log(response);

      this.customers = response;
    });
  }

  public getCustomerById(customer: Customer) {

    this.addCustomer.getCustomerById(customer);

  }

  public resetFormCustomer(){

    this.addCustomer.formReset();
    console.log(this.addCustomer.rhSelect);

    this.addCustomer.formCustomer.value.rh = 'Seleccione el RH';
  }

  public seeAll(customer: Customer) {

    this.customerService.findByDocumentAccess(customer).subscribe(resp => {
      if (resp != null) {
        this.statusPlan = true;
        this.customerViewMore = resp
      }
    })

  }

  cleanViewMore() {
    this.statusPlan = false;
    this.showTableInfoAdi = false;

    this.customerViewMore = {} as CustomerInfoAdi;
  }

  cleanShowTableHistory(){
    this.showTableInfoAdi = false;
  }

  public deleteByIdCustomer(id: number) {

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
        this.customerService.deleteById(id).subscribe(response => response);

        Swal.fire({
          title: 'Eliminado!',
          text: 'El cliente ha sido eliminado',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }

        })
      }


    })

  }

  public getCustomerByDocument(customer: CustomerInfoAdi) {

    this.showTableInfoAdi = true;

    this.customerService.findByInfoDocument(customer).subscribe(resp => this.customersDataHistory = resp);

  }

}
