import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../interfaces/Paymen';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private routePayment = `${environment.apiUrl}payments/`;

  private headers = new Headers();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }


  // Get membership list
  public getAllPayment(): Observable<Payment[]> {
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Access-Control-Allow-Origin', '*')
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    return this.http.get<Payment[]>(`${this.routePayment}all`);

  }


  // Create membership
  public createPayment(membership: Payment): Observable<any> {

    return this.http.post<any>(`${this.routePayment}save`, membership);

  }

  public updatePayment(membership: Payment) {
    return this.http.put(`${this.routePayment}edit/${membership.id}`, membership);
  }

  public deleteByIdPayment(idPayment: number):Observable<any> {
    return this.http.delete<any>(`${this.routePayment}delete/${idPayment}`);
  }

  //Generar PDF
  generatePdf(payment: any): String | SafeResourceUrl {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const startDate = new Date(payment.membership_start_date);
    const endDate = this.calculateEndDate(startDate, payment.membership.type_membership);

    const doc = new jsPDF({
      format: 'a5',
      orientation: 'landscape'
    });

    const logoUrl = 'assets/logos/iconoLineal.png';
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
      ['Nombre', 'Documento', 'Telefono'],
      [payment.customer.name, payment.customer.document, payment.customer.phone],
    ]);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Plan: ${payment.membership.type_membership}`, 20, 110);
    doc.text(`Fecha de inicio: ${formatDate(payment.membership_start_date.toString())}`, 20, 115);
    doc.text(`Fecha de culminación: ${formatDate(payment.membership_end_date ?? endDate.toString())}`, 20, 120);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return pdfUrl;

    // Sanitizar la URL para evitar el error de seguridad
    // return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  private drawTable(doc: jsPDF, startY: number, data: string[][]) {
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

  private splitTextIntoLines(doc: jsPDF, text: string, maxWidth: number): string[] {
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

  private calculateEndDate(startDate: Date, planType: string): Date {
    const endDate = new Date(startDate); // Copiar la fecha de inicio para no modificarla

    switch (planType) {
      case 'MENSUAL 4 DIAS A LA SEMANA':
      case 'MENSUAL LUNES A VIERNES':
      case 'MENSUAL 3 DIAS A LA SEMANA':
        endDate.setMonth(endDate.getMonth() + 1); // Sumar 1 mes
        break;

      case 'TRIMESTRAL 3 DIAS A LA SEMANA':
      case 'TRIMESTRAL 4 DIAS A LA SEMANA':
      case 'TRIMESTRAL LUNES A VIERNES':
        endDate.setMonth(endDate.getMonth() + 3); // Sumar 3 meses
        break;

      case 'ANUAL LUNES A VIERNES':
        endDate.setFullYear(endDate.getFullYear() + 1); // Sumar 1 año
        break;

      case 'CLASE':
        endDate.setDate(endDate.getDate() + 1); // Sumar 1 día
        break;

      default:
        throw new Error(`Tipo de plan no válido: ${planType}`);
    }

    return endDate;
  }
}
