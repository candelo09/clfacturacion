import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Payment } from 'src/app/interfaces/Paymen';
import { PaymentService } from '../payment.service';
import { UtilsService } from 'src/app/utils.service';
import { PaymentFormComponent } from "../payment-form/payment-form.component";
import { PaymentPdfComponent } from '../payment-pdf/payment-pdf.component';


@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [PaymentFormComponent, CommonModule, PaymentPdfComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {

  payments: Payment[] = [];

  pdfSrc: any = '';

  @ViewChild(PaymentFormComponent) addPayment !: PaymentFormComponent;

  constructor(private membershipService: PaymentService, private utilService: UtilsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllPayments();
  }

  //Get of the payments
  public getAllPayments() {
    this.membershipService.getAllPayment().subscribe(response => {
      this.payments = response
    });
  }

  public getPaymentById(payment: Payment) {
    console.log(payment);

    this.addPayment.getPaymentById(payment);
  }

  generatePdf(payment: Payment) {

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const doc = new jsPDF({
      format: 'a5',
      orientation: 'landscape'
    });

    // Logo (opcional)
    const logoUrl = 'assets/logos/iconoLineal.png'; // Ruta a tu logo
    doc.addImage(logoUrl, 'PNG', 20, 10, 70, 10); // Ajusta las coordenadas y el tamaño

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('RECIBO DE PAGO', 105, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Fecha de pago: ${formatDate(payment.paid_date.toString())}`, 20, 40);
    doc.text(`Método de pago: ${payment.payment_method}`, 20, 45);
    doc.text(`Valor: $${payment.amount.toLocaleString('es-CO')}`, 20, 50);
    let currentY = 55; //separador del encabezado y el cuerpo del pdf

    // Detalles del pago
    currentY += 15;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles del pago', 105, 65, { align: 'center' });
    // Dibujar tabla
    this.drawTable(doc, currentY, [
      ['Nombre','Documento','Telefono'],
      [payment.customer.name, payment.customer.document, payment.customer.phone],
    ]);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Plan: ${payment.membership.type_membership}`, 20, 110);
    doc.text(`Fecha de incio: ${formatDate(payment.membership_start_date.toString())}`, 20, 115);
    doc.text(`Fecha de culminacion: ${formatDate(payment.membership_end_date.toString())}`, 20, 120);

    // Guarda el PDF como un Blob
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Sanitizar la URL para evitar el error de seguridad
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  drawTable(doc: jsPDF, startY: number, data: string[][]) {
    const colWidth = 60; // Ancho de cada columna
    const rowHeight = 10; // Altura de cada fila
    const padding = 5; // Espaciado interno de las celdas
    let currentY = startY;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);

    // Dibujar las filas y columnas de la tabla
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      let maxLines = 1; // Número máximo de líneas en esta fila

      // Calcular el número máximo de líneas necesarias para esta fila
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const text = row[colIndex];
        const lines = this.splitTextIntoLines(doc, text, colWidth - 2 * padding);
        if (lines.length > maxLines) {
          maxLines = lines.length;
        }
      }

      // Dibujar las celdas de esta fila
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const text = row[colIndex];
        const x = 20 + colIndex * colWidth; // Posición X de la celda
        const y = currentY; // Posición Y de la celda

        // Dividir el texto en varias líneas si es necesario
        const lines = this.splitTextIntoLines(doc, text, colWidth - 2 * padding);

        // Dibujar cada línea de texto en la celda
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
          const lineY = y + padding + lineIndex * 10; // Ajustar la posición Y para cada línea
          doc.text(lines[lineIndex], x + padding, lineY);
        }

        // Dibujar el borde de la celda
        doc.rect(x, y, colWidth, rowHeight * maxLines);

        if (rowIndex > 0) {
          doc.setFont('helvetica', 'normal');
        }
      }

      currentY += rowHeight * maxLines;
    }
  }

  splitTextIntoLines(doc: jsPDF, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    let currentLine = '';

    // Dividir el texto en palabras
    const words = text.split(' ');

    for (const word of words) {
      // Calcular el ancho de la palabra
      const wordWidth = doc.getTextWidth(word);

      // Si la palabra cabe en la línea actual, agregarla
      if (doc.getTextWidth(currentLine + ' ' + word) <= maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        // Si no cabe, agregar la línea actual al array y empezar una nueva línea
        lines.push(currentLine);
        currentLine = word;
      }
    }

    // Agregar la última línea
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
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
