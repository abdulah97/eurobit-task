import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { Budget } from '../model/budget';
import { BudgetRequest } from '../model/budget-request';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private url = 'http://ebit-front-test.herokuapp.com/budget';

  constructor(private http: HttpClient) { }

  fetchBudgets(){
    return this.http.get<Budget[]>(this.url).pipe(
      catchError(this.handleError)
    )
  }

  createBudget(request: BudgetRequest) {
    return this.http.post<BudgetRequest>(this.url, request).pipe(
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
}
