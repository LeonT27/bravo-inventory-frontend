import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { History } from './history';
import { HistoryFilter } from './historyFilter';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private transactionTypeUrl = "https://localhost:44304/api/history/"

  constructor(private http: HttpClient) { }

  getHistory(id: number, filter: any): Observable<History[]> {
    return this.http.get<History[]>(this.transactionTypeUrl + id, {params: {...filter}})
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getHistoryLosses(id: number, filter: any): Observable<History[]> {
    return this.http.get<History[]>(this.transactionTypeUrl + id + '/losses', {params: {...filter}})
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
