import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Category } from '../interfaces/Category';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private routeCategory = `${environment.apiUrl}categories/`;

  private headers = new Headers();

  constructor(private http: HttpClient) { }


  // Get category list
  public getCategory(): Observable<Category[]> {
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Access-Control-Allow-Origin', '*')
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    return this.http.get<Category[]>(`${this.routeCategory}all`);

  }


  // Create category
  public createCategory(category: Category): Observable<any> {

    return this.http.post<any>(`${this.routeCategory}save`, category);

  }

  public updateCategory(category: Category) {
    return this.http.put(`${this.routeCategory}edit/${category.id_category}`, category);
  }

  public deleteByIdCategory(idCategoria: number):Observable<any> {
    return this.http.delete<any>(`${this.routeCategory}delete/${idCategoria}`);
  }



}
