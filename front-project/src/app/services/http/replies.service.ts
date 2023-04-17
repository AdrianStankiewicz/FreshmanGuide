import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Reply } from 'src/app/models/reply';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  constructor(private http: HttpClient) {}

  getAllFromReplies(): Observable<Reply[]> {
    return this.http
      .get<Reply[]>(`${Constants.backendApiUrl}Main/GetAllReplies`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneFromReplies(replyID: number): Observable<Reply> {
    return this.http
      .get<Reply>(`${Constants.backendApiUrl}Main/GetReply/${replyID - 1}`)
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
