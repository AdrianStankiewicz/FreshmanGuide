import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Shop } from 'src/app/models/shop';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getAllFromShop(): Observable<Shop[]> {
    return this.http
      .get<Shop[]>(`${Constants.backendApiUrl}Main/GetAllShops`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  getOneFromShop(shopID: number): Observable<Shop> {
    return this.http
      .get<Shop>(`${Constants.backendApiUrl}Main/GetShop/${shopID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
