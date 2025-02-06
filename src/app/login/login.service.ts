import { Injectable } from '@angular/core';
import { Login } from '../interfaces/Login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { RespLogin } from '../interfaces/RespLogin';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  private routeLogin = 'http://localhost:8081/api/auth/';

  constructor(private http: HttpClient, private route:Router) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }


  public login(body_login: Login): Observable<any> {

    return this.http.post<any>(`${this.routeLogin}login`, body_login).pipe(
      tap((userData) => {
        // console.log(userData.token);

        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }), map((userData) => userData), catchError(this.handleError))

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      sessionStorage.clear();
      Swal.fire({
        title: "Error",
        text: "Credenciales Incorrectas o usuario no autorizado",
        icon: "error"
      }).then(() =>{
        window.location.reload();
      });
    }
    return throwError(() => new Error('Credenciales Incorrectas'));
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    // console.log('this.currentUserLoginOn.asObservable() ',this.currentUserLoginOn.asObservable());

    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
