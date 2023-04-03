import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Cantine } from '../models/Cantine';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BasicReadingService {

  constructor(private http: HttpClient) { }

  getMenuFromCantine(): Observable<Cantine[]>{
    return this.http.get<Cantine[]>(`${Constants.backendApiUrl}Main/GetAllCantines`).pipe(retry(1), catchError(this.handleError));
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
