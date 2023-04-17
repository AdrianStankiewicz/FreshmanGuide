import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Internship } from 'src/app/models/internship';

@Injectable({
  providedIn: 'root',
})
export class InternshipsService {
  constructor(private http: HttpClient) {}

  getAllFromInternships(): Observable<Internship[]> {
    return this.http
      .get<Internship[]>(`${Constants.backendApiUrl}Main/GetAllInternships`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromInternships(internshipID: number): Observable<Internship> {
    return this.http
      .get<Internship>(
        `${Constants.backendApiUrl}Main/GetInternship/${internshipID - 1}`
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
