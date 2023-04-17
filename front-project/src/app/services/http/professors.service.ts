import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Professor } from 'src/app/models/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService {
  constructor(private http: HttpClient) {}

  getAllFromProfessors(): Observable<Professor[]> {
    return this.http
      .get<Professor[]>(`${Constants.backendApiUrl}Main/GetAllProfessors`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromProfessors(professorID: number): Observable<Professor> {
    return this.http
      .get<Professor>(
        `${Constants.backendApiUrl}Main/GetProfessor/${professorID - 1}`
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
