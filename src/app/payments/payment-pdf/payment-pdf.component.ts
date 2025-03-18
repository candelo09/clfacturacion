import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-pdf.component.html',
  styleUrl: './payment-pdf.component.css'
})
export class PaymentPdfComponent {

  @Input() pdfSrc: any = '';

}
