import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/http/posts.service';
import { QuestionPopupComponent } from '../question-popup.component';
import { FormGroup } from '@angular/forms';
import { Subject, take, takeUntil, switchMap, Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { LoadingService } from 'src/app/services/loading.service';

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
    private loadingService: LoadingService
  ) {}

  public submit(
    form: FormGroup,
    selectedCategoryID: number,
    dialogRef: MatDialogRef<QuestionPopupComponent>
  ): void {
    this.loadingService.startLoading();
    this.postsService
      .postPost({
        nick: form.controls['nick'].value,
        categoryId: selectedCategoryID,
        body: form.controls['question'].value,
        createdAt: new Date(),
        verified: false,
        reply: [],
      })
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
          this.toastr.success('Post został dodany', 'Sukces');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak', 'Błąd');
          this.loadingService.stopLoading();
        },
      });
  }
}
