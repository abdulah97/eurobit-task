import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {JwtHelperService} from 'node_modules/@auth0/angular-jwt'
import { AuthToken } from 'src/app/user/auth.token';
import { Account } from 'src/app/user/account';
import { LoginRequest } from '../model/login-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private loginUrl = 'http://ebit-front-test.herokuapp.com/login';
  jwtHelper = new JwtHelperService();
  refreshTokenInProcess = false;
  logoutSubject = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  attemptLogin(request: LoginRequest): Observable<AuthToken> {
    return this.http.post<AuthToken>( this.loginUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

  public isLoggedIn(): boolean {
    if (this.getToken() !== null) {
      return true;
    } else {
      this.logOut();
      return false;
    }
  }

  checkForRefresh() {
    const expirationDate = new Date(localStorage.getItem('expiration'));
    const now = new Date();
    const expiresIn = expirationDate.getTime() - now.getTime();
    const expiresInMinutes = (expiresIn / 1000) / 60;
    if (expiresInMinutes < 20 && expiresInMinutes > 0 && !this.refreshTokenInProcess) {
      this.refreshTokenInProcess = true;
    }
  }
  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getToken(): string {
    return localStorage.getItem('auth_token');
  }
}
