import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Dictionary } from 'src/app/models/dictionary';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}

  getAllFromDictionary(): Observable<Dictionary[]> {
    return this.http
      .get<Dictionary[]>(`${Constants.backendApiUrl}Main/GetAllDictionaries`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromDictionary(dictionaryID: number): Observable<Dictionary> {
    return this.http
      .get<Dictionary>(
        `${Constants.backendApiUrl}Main/GetDictionary/${dictionaryID - 1}`
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
