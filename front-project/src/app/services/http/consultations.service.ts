import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Consultation } from 'src/app/models/consultation';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getAllFromConsultations(): Observable<Consultation[]> {
    return this.http
      .get<Consultation[]>(`${Constants.backendApiUrl}Main/GetAllConsultations`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  getOneFromConsultations(consultationID: number): Observable<Consultation> {
    return this.http
      .get<Consultation>(
        `${Constants.backendApiUrl}Main/GetConsultations/${consultationID}`
      )
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
