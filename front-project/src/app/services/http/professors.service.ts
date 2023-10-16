import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Professor } from 'src/app/models/professor';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  public getAllFromProfessors(): Observable<Professor[]> {
    return this.http
      .get<Professor[]>(`${Constants.backendApiUrl}Main/GetAllProfessors`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public getOneFromProfessors(professorID: number): Observable<Professor> {
    return this.http
      .get<Professor>(
        `${Constants.backendApiUrl}Main/GetProfessor/${professorID}`
      )
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
