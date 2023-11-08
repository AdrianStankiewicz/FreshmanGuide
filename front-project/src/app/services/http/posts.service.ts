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
import { Post, PostPost } from 'src/app/models/post';
import { HandleErrorService } from '../handle-error.service';
import { RepliesService } from './replies.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public allPosts$ = new BehaviorSubject<Post[]>([]);

  public getAllPosts$(): Observable<Post[]> {
    return this.allPosts$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  public getAllFromPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${Constants.backendApiUrl}Main/GetAllPosts`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public getOneFromPosts(postID: number): Observable<Post> {
    return this.http
      .get<Post>(`${Constants.backendApiUrl}Main/GetPost/${postID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public postPost(post: PostPost): Observable<Post> {
    return this.http
      .post<Post>(`${Constants.backendApiUrl}Main/PostPost`, post)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  public updatePost(postID: number, body: any): Observable<Post> {
    return this.http
      .put<Post>(`${Constants.backendApiUrl}Main/EditPost/${postID}`, body)
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
