import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Canteen } from '../../models/canteen';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class CanteenService {
  constructor(private http: HttpClient) {}

  getAllFromCanteen(): Observable<Canteen[]> {
    return this.http
      .get<Canteen[]>(`${Constants.backendApiUrl}Main/GetAllCanteens`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromCanteen(canteenID: number): Observable<Canteen> {
    return this.http
      .get<Canteen>(
        `${Constants.backendApiUrl}Main/GetCanteen/${canteenID - 1}`
      )
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
