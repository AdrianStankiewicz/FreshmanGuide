import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { RepliesService } from 'src/app/services/http/replies.service';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class EditForumCommentFormService {
  private unsubscribe$ = new Subject<boolean>();

  destroy(): void {
    this.unsubscribe$.next(true);
  }

  constructor(
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private router: Router,
    private repliesApiService: RepliesService
  ) {}

  delete(commentID: number): void {
    this.loadingService.startLoading();
    this.repliesApiService
      .deleteReply(commentID)
      .pipe(take(1), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (): void => {
          this.toastr.success('Pomyślnie usunięto');
          this.router.navigateByUrl('/admin/forum');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak');
          this.loadingService.stopLoading();
        },
      });
  }
}
