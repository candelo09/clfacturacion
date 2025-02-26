import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Payment } from 'src/app/interfaces/Paymen';
import Swal from 'sweetalert2';
import { CommonModule, CurrencyPipe, formatCurrency } from '@angular/common';
import { CustomersService } from 'src/app/customers/customers.service';
import { Customer } from 'src/app/interfaces/Customer';
import { lastValueFrom } from 'rxjs';
import { MembershipService } from 'src/app/memberships/membership.service';
import { Membership } from 'src/app/interfaces/Membership';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {

  formPayment: FormGroup;

  searchedOptionsCustomer:Customer[] = [];
  listTotalCustomer:Customer[] = [];
  valueSelectCustomer:string = '';

  listTotalMembership:Membership[] = [];
  searchedOptionsMembership:Membership[] = [];
  valueSelectMembership:string = '';

  constructor(private fb: FormBuilder, private payment_service: PaymentService, private customer_service:CustomersService, private membership_service:MembershipService) {
    this.formPayment = this.fb.group({});
  }

  ngOnInit(): void {
    this.fromPaymentCreate();
    console.log('this.searchedOptions ',this.searchedOptionsCustomer);
    this.getCustomer();
    this.getMembership();

  }

  public fromPaymentCreate() {
    this.formPayment = this.fb.group({
      id: [''],
      paid_date: ['', Validators.required],
      amount: ['', Validators.required],
      membership: ['', Validators.required],
      customer: ['', Validators.required],
      payment_method: ['', Validators.required],
      amount_show:['', Validators.required],
      membership_start_date:['',Validators.required],
      // membership_end_date: ['', Validators.required]
    })
  }

  public async getCustomer(){
    const customers = this.customer_service.getAllCustomers();
    const data$ = await lastValueFrom(customers);

    // console.log('data ', data$);


    this.listTotalCustomer = data$;

    this.searchedOptionsCustomer.length == 0 ? this.searchedOptionsCustomer = this.listTotalCustomer : this.searchedOptionsCustomer;
  }

  public async getMembership(){
    const memberships = this.membership_service.getAllMembership();
    const data$ = await lastValueFrom(memberships);

    // console.log('data ', data$);


    this.listTotalMembership = data$;

    this.searchedOptionsMembership.length == 0 ? this.searchedOptionsMembership = this.listTotalMembership : this.searchedOptionsMembership;
  }

  public createPayment() {

    console.log(this.formPayment.value);


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

    this.valueSelectCustomer = payment.customer.name,
    this.valueSelectMembership = payment.membership.type_membership;

    this.formPayment.patchValue({
      id: payment.id,
      paid_date: payment.paid_date,
      amount: payment.amount,
      membership: payment.membership,
      customer: payment.customer,
      payment_method: payment.payment_method,
      amount_show:formatCurrency(payment.amount,'en-US','','','1.2-3'),
      membership_start_date: payment.membership_start_date,
      membership_end_date: payment.membership_end_date
    });

  }

  public updatePayment() {

    if (this.formPayment.valid) {

      this.payment_service.updatePayment(this.formPayment.value as Payment).subscribe((response) => {

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

  onSeachDropdownValueCustomer($event:any) {
    const value = $event.target.value.toUpperCase();
    // console.log(value);

    this.searchedOptionsCustomer = this.listTotalCustomer.filter(option => option.document.includes(value));

    // console.log('this.searchedOptions ',this.searchedOptions);

  }

  onSeachDropdownValueMembership($event:any) {
    const value = $event.target.value.toUpperCase();
    // console.log(value);

    this.searchedOptionsMembership= this.listTotalMembership.filter(option => option.type_membership.includes(value));

    // console.log('this.searchedOptions ',this.searchedOptions);

  }

  selectCustomer(item:Customer){
    // console.log('item',item.id);

    this.formPayment.patchValue({
      customer:item
    })
    this.valueSelectCustomer = item.name;

  }

  selectMembership(item:Membership){

    if (item.code_plan == 5) {
      this.formPayment.patchValue({
        membership:item,
        amount: 0,
        payment_method: 'NO APLICA'

      })
    } else{

      this.formPayment.patchValue({
        membership:item,
        amount_show:formatCurrency(item.price,'en-US','','','1.2-3'),
        amount: item.price
      })
    }
    // console.log('item',item.id);

    this.formPayment.patchValue({
      membership:item
    })

    this.valueSelectMembership = item.type_membership;

  }

  onSelectDropdownValue(option:any) {
    console.log(option);

  }


}
