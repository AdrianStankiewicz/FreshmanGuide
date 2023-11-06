import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Internship } from 'src/app/models/internship';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class InternshipsService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  public getAllFromInternships(): Observable<Internship[]> {
    return this.http
      .get<Internship[]>(`${Constants.backendApiUrl}Main/GetAllInternships`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public getOneFromInternships(internshipID: number): Observable<Internship> {
    return this.http
      .get<Internship>(
        `${Constants.backendApiUrl}Main/GetInternship/${internshipID}`
      )
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
