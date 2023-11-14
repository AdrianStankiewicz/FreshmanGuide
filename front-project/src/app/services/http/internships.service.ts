import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { Constants } from 'src/app/constants';
import {
  Internship,
  PostInternship,
  UpdateInternship,
} from 'src/app/models/internship';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class InternshipsService {
  public allInternships$ = new BehaviorSubject<Internship[]>([]);

  public getAllPosts$(): Observable<Internship[]> {
    return this.allInternships$.asObservable();
  }

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

  public postInternship(
    internship: PostInternship
  ): Observable<PostInternship> {
    return this.http
      .post<PostInternship>(
        `${Constants.backendApiUrl}Main/PostInternship`,
        internship
      )
      .pipe(catchError(this.handleErrorService.handleError));
  }

  public updateInternship(
    internID: number,
    body: UpdateInternship
  ): Observable<Internship> {
    return this.http
      .put<Internship>(
        `${Constants.backendApiUrl}Main/EditInternsip/${internID}`,
        body
      )
      .pipe(catchError(this.handleErrorService.handleError));
  }

  public deleteInternship(internID: number): Observable<Internship> {
    return this.http
      .delete<Internship>(
        `${Constants.backendApiUrl}Main/DeleteInternship/${internID}`
      )
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
