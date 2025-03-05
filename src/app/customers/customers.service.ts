import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer, CustomerInfoAdi } from '../interfaces/Customer';
import { Observable } from 'rxjs';
import { PhysicalProgress } from '../interfaces/PhysicalProgress';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    private routerCustomer = `${environment.apiUrl}customers/`;
    private routerCustomerProgress = `${environment.apiUrl}phyisical/progress/`

    constructor(private http: HttpClient) { }


    // Service Get Collaborator list

    public getAllCustomers(): Observable<Customer[]> {

      return this.http.get<Customer[]>(`${this.routerCustomer}all`);
    }

    //Agregar Customer
    public addCustomer(bodyCustomer: Customer):Observable<Customer> {

      return this.http.post<Customer>(`${this.routerCustomer}save`, bodyCustomer);
    }

    //Actualizar Customer
    public updateCustomer(bodyCustomer: Customer): Observable<Customer> {

      return this.http.put<Customer>(`${this.routerCustomer}edit/${bodyCustomer.id}`, bodyCustomer);
    }

    public findByDocumentAccess(bodyCustomer: Customer): Observable<CustomerInfoAdi>{

      return this.http.get<CustomerInfoAdi>(`${this.routerCustomer}access/${bodyCustomer.document}`);
    }

    public findByInfoDocument(document: string): Observable<CustomerInfoAdi[]>{

      return this.http.get<CustomerInfoAdi[]>(`${this.routerCustomer}info/${document}`);
    }

    public findByDocument(customer: string): Observable<Customer>{

      return this.http.get<Customer>(`${this.routerCustomer}${customer}`);
    }

    //traerCustomer por id
    // public getCustomer(id: number): Observable<Customer[]> {
    //   return this.http.get<Customer[]>(`${this.routerCustomer}findCustomer/${id}`);
    // }

    // Find by document
    // public getByDocument(document: number): Observable<Customer[]> {
    //   return this.http.get<Customer[]>(`${this.routerCustomer}findbyIdentif/${document}`);
    // }

    public deleteById(id: number) {
      return this.http.delete(`${this.routerCustomer}delete/${id}`);
    }

    // Upload Images
    public uploadImages(file: File) {

      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "multipart/form-data")

      let params = new HttpParams();
      params.set('file', 'file');

      let resource = new FormData();
      resource.append('file', file);

      return this.http.post(`${this.routerCustomer}upload`,  resource, {params:params})
    }


    // SERVICES PHYISICAL PROGRESS OPTIONAL

    public getAllPhysicalProgress():Observable<PhysicalProgress[]>{

      return this.http.get<PhysicalProgress[]>(`${this.routerCustomerProgress}all`)
    }

    public addPhysicalProgress(bodyPhysicalProgress:PhysicalProgress){
      return this.http.post(`${this.routerCustomerProgress}save`, bodyPhysicalProgress);
    }

}
