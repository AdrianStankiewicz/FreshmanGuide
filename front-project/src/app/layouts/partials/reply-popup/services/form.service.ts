import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { Reply } from 'src/app/models/reply';
import { PostsService } from 'src/app/services/http/posts.service';
import { RepliesService } from 'src/app/services/http/replies.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ReplyPopupComponent } from '../reply-popup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private unsubscribe$ = new Subject<void>();

  public destroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private replyService: RepliesService
  ) {}

  public submit(
    form: FormGroup,
    postID: number,
    dialogRef: MatDialogRef<ReplyPopupComponent>
  ): void {
    this.loadingService.startLoading();
    let replyData: Reply = {
      nick: form.controls['nick'].value,
      body: form.controls['reply'].value,
      postId: postID,
      createdAt: new Date().toISOString(),
      verified: false,
    };
    this.replyService
      .postReply(replyData)
      .pipe(
        take(1),
        switchMap((): Observable<Post[]> => {
          return this.postsService.getAllFromPosts();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (posts: Post[]): void => {
          this.postsService.allPosts$.next(posts);
          dialogRef.close();
          this.toastr.success('Komentarz został dodany', 'Sukces');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak', 'Błąd');
          this.loadingService.stopLoading();
        },
      });
  }
}
