import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer, CustomerInfoAdi } from 'src/app/interfaces/Customer';
import { CustomersFormComponent } from '../customers-form/customers-form.component';
import Swal from 'sweetalert2';
import { PhysicalProgress } from 'src/app/interfaces/PhysicalProgress';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Customer[] = [];
  customerViewMore: CustomerInfoAdi = {} as CustomerInfoAdi;
  customerHistory: Customer = {} as Customer;
  customerHistoryPhysicalProgress: PhysicalProgress[] = [];
  customersDataHistory: CustomerInfoAdi[] = [];
  textFilterData: string = "";
  existDataHistoryCustomer = false;
  flagLoadingMembership = false;

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

    console.log('customer ',customer);


    this.addCustomer.getCustomerById(customer);

  }

  public resetFormCustomer() {

    this.addCustomer.formReset();
    // console.log(this.addCustomer.rhSelect);

    // this.addCustomer.formCustomer.value.rh = 'Seleccione el RH';
  }

  public seeAll(customer: Customer) {

    this.customerHistory = customer;
    this.flagLoadingMembership = true;
    this.customerService.findByDocumentAccess(customer).subscribe(resp => {
      if (resp != null) {
        this.statusPlan = true;
        this.flagLoadingMembership = false;
        this.customerViewMore = resp


      }else{
        this.flagLoadingMembership = false;
      }
    })
    console.log('this.customerViewMore ', this.customerViewMore.document);
  }
  public seeAllProggres(customer: Customer) {

    this.customerHistory = customer;
    this.flagLoadingMembership = true;
    this.customerService.findByPhysicalProgressDocument(customer).subscribe(resp => {
      if (resp != null) {
        this.customerHistoryPhysicalProgress = resp;
        this.statusPlan = true;
        this.flagLoadingMembership = false;
      }
    })

  }

  cleanViewMore() {
    this.statusPlan = false;
    this.showTableInfoAdi = false;
    this.existDataHistoryCustomer = false;

    this.customerViewMore = {} as CustomerInfoAdi;
  }

  cleanShowTableHistory() {
    this.showTableInfoAdi = false;
    this.existDataHistoryCustomer = false;
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

  public getCustomerByDocument(customer: string) {

    this.showTableInfoAdi = true;
    // this.flagLoadingMembership = true;
    this.customerService.findByInfoDocument(customer).subscribe(resp => {
      this.customersDataHistory = resp

      if (this.customersDataHistory.length <= 0) {
        this.existDataHistoryCustomer = true;
        // this.flagLoadingMembership = false;
      }
    });

  }

  filterTable($event: any) {

    const value = $event.target.value;

    let dataFilterByUser: any = this.customers.filter(resp => resp.document.includes(value) || resp.name.includes(value)
    );

    console.log('dataFilterByUser ', dataFilterByUser);

    if (value == "") {
      dataFilterByUser = this.getAllUsers();
    }

    if (dataFilterByUser.length > 0 || value != "") {
      this.customers = dataFilterByUser;
    } else {
      this.getAllUsers();
    }

    // console.log(dataFilterByUser);


  }

  filterTableBtnSearch() {


    let dataFilterByUser: any = this.customers.filter(resp => resp.document.includes(this.textFilterData) || resp.name.includes(this.textFilterData)
    );

    console.log('dataFilterByUser ', dataFilterByUser);

    if (this.textFilterData == "") {
      dataFilterByUser = this.getAllUsers();
    }

    if (dataFilterByUser.length > 0 || this.textFilterData != "") {
      this.customers = dataFilterByUser;
    } else {
      this.getAllUsers();
    }

    // console.log(dataFilterByUser);


  }

}
