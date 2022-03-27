import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Product } from "./product-list/product";
import { ProductCommand } from "./product-add/productCommand";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = "https://localhost:44304/api/Product"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addProduct(product: ProductCommand): Observable<any> {
    return this.http.post<any>(this.productUrl, product)
    .pipe(
      tap(data => alert('Product created: ' + product.name)),
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
