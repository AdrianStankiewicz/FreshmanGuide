import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllFromCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${Constants.backendApiUrl}Main/GetAllCategories`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromCategories(categoryID: number): Observable<Category> {
    return this.http
      .get<Category>(
        `${Constants.backendApiUrl}Main/GetCategory/${categoryID - 1}`
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
