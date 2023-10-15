import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Dictionary } from 'src/app/models/dictionary';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  public getAllFromDictionary(): Observable<Dictionary[]> {
    return this.http
      .get<Dictionary[]>(`${Constants.backendApiUrl}Main/GetAllDictionaries`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public getOneFromDictionary(dictionaryID: number): Observable<Dictionary> {
    return this.http
      .get<Dictionary>(
        `${Constants.backendApiUrl}Main/GetDictionary/${dictionaryID}`
      )
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
