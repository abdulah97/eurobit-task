import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { RegisterRequest } from '../model/register-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'https://cors-anywhere.herokuapp.com/http://ebit-front-test.herokuapp.com/register';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(request: RegisterRequest) {
    return this.http.post<RegisterRequest>(this.registerUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error.status);
  }
}
