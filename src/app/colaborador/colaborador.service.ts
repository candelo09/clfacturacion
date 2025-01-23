import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewColaborador, Users } from '../interfaces/Colaborador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private routerColaborador = `${environment.apiUrl}users/`;

  constructor(private http: HttpClient) { }


  // Service Get Collaborator list

  public getAllUsers(): Observable<Users[]> {

    return this.http.get<Users[]>(`${this.routerColaborador}all`);
  }

  //Agregar colaborador
  public addUser(bodyColaborador: Users) {

    return this.http.post(`${this.routerColaborador}save`, bodyColaborador);
  }

  //Actualizar colaborador
  public updateColaborador(bodyColaborador: Users): Observable<Users> {

    return this.http.put<Users>(`${this.routerColaborador}edit/${bodyColaborador.id}`, bodyColaborador);
  }

  //traerColaborador por id
  // public getColaborador(id: number): Observable<Users[]> {
  //   return this.http.get<Users[]>(`${this.routerColaborador}findcolaborador/${id}`);
  // }

  // Find by document
  // public getByDocument(document: number): Observable<Users[]> {
  //   return this.http.get<Users[]>(`${this.routerColaborador}findbyIdentif/${document}`);
  // }

  public deleteById(id: number) {
    return this.http.delete(`${this.routerColaborador}delete/${id}`);
  }

  // Upload Images
  public uploadImages(file: File) {

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "multipart/form-data")

    let params = new HttpParams();
    params.set('file', 'file');

    let resource = new FormData();
    resource.append('file', file);

    return this.http.post(`${this.routerColaborador}upload`,  resource, {params:params})
  }

}
