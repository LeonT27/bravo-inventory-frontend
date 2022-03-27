import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { TransactionType } from './transactionType';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  private transactionTypeUrl = "https://localhost:44304/api/TransactionType"

  constructor(private http: HttpClient) { }

  getTransactionTypes(): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(this.transactionTypeUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
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
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
