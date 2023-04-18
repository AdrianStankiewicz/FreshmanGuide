import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getAllFromCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${Constants.backendApiUrl}Main/GetAllCategories`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  getOneFromCategories(categoryID: number): Observable<Category> {
    return this.http
      .get<Category>(`${Constants.backendApiUrl}Main/GetCategory/${categoryID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
