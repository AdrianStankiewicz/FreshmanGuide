import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Post } from 'src/app/models/post';
import { HandleErrorService } from '../handle-error.service';
import { RepliesService } from './replies.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getAllFromPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${Constants.backendApiUrl}Main/GetAllPosts`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  getOneFromPosts(postID: number): Observable<Post> {
    return this.http
      .get<Post>(`${Constants.backendApiUrl}Main/GetPost/${postID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }
}
