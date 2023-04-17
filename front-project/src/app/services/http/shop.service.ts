import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Shop } from 'src/app/models/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getAllFromShop(): Observable<Shop[]> {
    return this.http
      .get<Shop[]>(`${Constants.backendApiUrl}Main/GetAllShops`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromShop(shopID: number): Observable<Shop> {
    return this.http
      .get<Shop>(`${Constants.backendApiUrl}Main/GetShop/${shopID - 1}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      //Server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
