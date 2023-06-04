import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Canteen } from '../../models/canteen';
import { Constants } from '../../constants';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class CanteenService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getAllFromCanteen(): Observable<Canteen[]> {
    return this.http
      .get<Canteen[]>(`${Constants.backendApiUrl}Main/GetAllCanteen`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  getOneFromCanteen(canteenID: number): Observable<Canteen> {
    return this.http
      .get<Canteen>(`${Constants.backendApiUrl}Main/GetCanteen/${canteenID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
