import { Component, ViewChild } from '@angular/core';
import { PaymentFormComponent } from "../payment-form/payment-form.component";
import { Payment } from 'src/app/interfaces/Paymen';
import { PaymentService } from '../payment.service';
import { UtilsService } from 'src/app/utils.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [PaymentFormComponent, CommonModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {

  payments: Payment[] = [];


    @ViewChild(PaymentFormComponent) addPayment !: PaymentFormComponent;

    constructor(private membershipService: PaymentService, private utilService: UtilsService) { }

    ngOnInit(): void {
      this.getAllPayments();
    }

    //Get of the payments
    public getAllPayments() {
      this.membershipService.getPayment().subscribe(response => {
        this.payments = response
      });
    }

    public getPaymentById(payment: Payment) {
      console.log(payment);

      this.addPayment.getPaymentById(payment);
    }

    // public deletePayment(id: number) {
    //   Swal.fire({
    //     title: '¿Estas seguro?',
    //     text: "No podras revertir esta acción",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     cancelButtonText: 'Cancelar',
    //     confirmButtonText: 'Si, Eliminar!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.membershipService.deleteByIdPayment(id).subscribe({
    //         next: resp => { this.utilService.messageAlert('El plan ha sido eliminado', 'En hora buena!', 'success') },

    //         error: e => {
    //           console.log(e.error);
    //           this.utilService.messageAlert(e.error, 'Lo sentimos! :(', 'warning')


    //         }
    //       });

    //     }


    //   })
    // }

}
