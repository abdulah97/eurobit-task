import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { Transaction } from '../model/transaction';
import { TransactionRequest } from '../model/transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = 'http://ebit-front-test.herokuapp.com/transaction';

  constructor(private http: HttpClient) { }

  fetchTransactions(){
    return this.http.get<Transaction[]>(this.url).pipe(
      catchError(this.handleError)
    )
  }

  createTransaction(request: TransactionRequest) {
    return this.http.post<TransactionRequest>(this.url, request).pipe(
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
