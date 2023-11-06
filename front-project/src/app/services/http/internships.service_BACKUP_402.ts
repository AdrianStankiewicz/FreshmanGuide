import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Internship, PostInternship } from 'src/app/models/internship';
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
        `${Constants.backendApiUrl}Main/GetInternship/${internshipID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

<<<<<<< HEAD
  public postInternship(internship: PostInternship): Observable<Internship> {
    return this.http
      .post<Internship>(`${Constants.backendApiUrl}Main/PostInternship`, internship)
=======
  public postInternship(internship: PostInternship): Observable<PostInternship> {
    return this.http
      .post<PostInternship>(`${Constants.backendApiUrl}Main/PostInternship`, internship)
>>>>>>> 3c8a44e4af6b00a1cc4ad8fac269e2600069993d
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
