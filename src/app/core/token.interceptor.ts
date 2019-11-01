import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/service/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('auth_token') !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+ this.auth.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
