import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionUrl = "https://localhost:44304/api/Transaction"

  constructor(private http: HttpClient) { }

  addTransaction(product: Transaction): Observable<any> {
    return this.http.post<any>(this.transactionUrl, product)
    .pipe(
      tap(data => alert('Transaction created')),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(JSON.stringify(err.error));
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
