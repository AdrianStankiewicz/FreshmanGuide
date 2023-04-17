import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getAllFromPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${Constants.backendApiUrl}Main/GetAllPosts`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromPosts(postID: number): Observable<Post> {
    return this.http
      .get<Post>(`${Constants.backendApiUrl}Main/GetPost/${postID - 1}`)
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
