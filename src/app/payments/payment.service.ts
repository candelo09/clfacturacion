import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../interfaces/Paymen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private routePayment = `${environment.apiUrl}payments/`;

  private headers = new Headers();

  constructor(private http: HttpClient) { }


  // Get membership list
  public getPayment(): Observable<Payment[]> {
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
}
