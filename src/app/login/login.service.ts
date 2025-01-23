import { Injectable } from '@angular/core';
import { Login } from '../interfaces/Login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { RespLogin } from '../interfaces/RespLogin';
import { Router } from '@angular/router';

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
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {

      console.error('Backend retornó el código de estado ', error);
      sessionStorage.clear();
      this.route.navigateByUrl("/login");
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
