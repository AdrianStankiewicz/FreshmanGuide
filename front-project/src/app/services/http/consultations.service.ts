import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Consultation } from 'src/app/models/consultation';

@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  constructor(private http: HttpClient) {}

  getAllFromConsultations(): Observable<Consultation[]> {
    return this.http
      .get<Consultation[]>(`${Constants.backendApiUrl}Main/GetAllConsultations`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromConsultations(consultationID: number): Observable<Consultation> {
    return this.http
      .get<Consultation>(
        `${Constants.backendApiUrl}Main/GetConsultations/${consultationID - 1}`
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
