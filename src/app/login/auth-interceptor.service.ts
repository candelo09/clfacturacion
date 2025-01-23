import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse }
  from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: LoginService, private route:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.userToken;
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse && !authRequest.url.includes('auth/signin') && error.status === 401){
          sessionStorage.clear();
          this.route.navigateByUrl("/login");

        }
        return throwError(() => error);
      })
    );
  }
}
