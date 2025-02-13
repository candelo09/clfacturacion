import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Payment } from 'src/app/interfaces/Paymen';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CustomersService } from 'src/app/customers/customers.service';
import { Customer } from 'src/app/interfaces/Customer';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {

  formPayment: FormGroup;

  options = ['OPTION1', 'OPTION2', 'OPTION3'];
  searchedOptionsCustomer:Customer[] = [];
  listTotalCustomer:Customer[] = [];
  valueSelectCustomer:string = '';

  constructor(private fb: FormBuilder, private payment_service: PaymentService, private customer_service:CustomersService) {
    this.formPayment = this.fb.group({});
  }

  ngOnInit(): void {
    this.fromPaymentCreate();
    console.log('this.searchedOptions ',this.searchedOptionsCustomer);
    this.getCustomer();




  }

  public fromPaymentCreate() {
    this.formPayment = this.fb.group({
      id: [''],
      paid_date: ['', Validators.required],
      amount: ['', Validators.required],
      id_membership: [true, Validators.required],
      id_customer: ['', Validators.required],
      membership_start_date: ['', Validators.required],
      membership_end_date: ['', Validators.required]
    })
  }

  public async getCustomer(){
    const customers = this.customer_service.getAllCustomers();
    const data$ = await lastValueFrom(customers);

    console.log('data ', data$);


    this.listTotalCustomer = data$;

    this.searchedOptionsCustomer.length == 0 ? this.searchedOptionsCustomer = this.listTotalCustomer : this.searchedOptionsCustomer;
  }

  public createPayment() {

    if (this.formPayment.valid) {



      this.payment_service.createPayment(this.formPayment.value as Payment).subscribe(() => {

        Swal.fire({
          text: 'Pago realizado satisfactoriamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000

        }).then((result) => {
          window.location.reload();
        });

      });
    } else {
      Swal.fire({
        text: 'Los campos son obligatorios',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000

      })
    }

  }

  public getPaymentById(payment: Payment) {
    // console.log(categoria.category)

    console.log(payment);


    this.formPayment.patchValue({
      id: payment.id,
      paid_date: payment.paid_date,
      amount: payment.amount,
      id_membership: payment.membership.id,
      id_customer: payment.customer.id,
      membership_start_date: payment.membership_start_date,
      membership_end_date: payment.membership_end_date
    });

  }

  public updatePayment() {

    if (this.formPayment.valid) {

      this.payment_service.updatePayment(this.formPayment.value).subscribe((response) => {

        response = JSON.parse(JSON.stringify(response));

        Swal.fire({
          text: 'Pago modificado satisfactoriamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000

        }).then((result) => {
          window.location.reload();
        });
      })
    }

  }

  onSeachDropdownValue($event:any) {
    const value = $event.target.value.toUpperCase();
    // console.log(value);

    this.searchedOptionsCustomer = this.listTotalCustomer.filter(option => option.document.includes(value));

    // console.log('this.searchedOptions ',this.searchedOptions);

  }

  selectCustomer(item:Customer){
    console.log('item',item);

    this.valueSelectCustomer = item.name;

  }

  onSelectDropdownValue(option:any) {
    console.log(option);

  }

}
