import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { UpdateReply } from 'src/app/models/reply';
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
    private repliesApiService: RepliesService,
    private fb: FormBuilder
  ) {}

  buildForm(): FormGroup {
    const editCommentForm = this.fb.nonNullable.group({
      nick: new FormControl<string>(
        { value: '', disabled: true },
        { validators: [Validators.required], updateOn: 'blur' }
      ),
      body: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      verified: new FormControl<boolean>(false, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });

    return editCommentForm;
  }

  validateEditCommentForm(editForm: FormGroup): void {
    editForm.markAllAsTouched();
    editForm.updateValueAndValidity();
  }

  submit(commentID: number, body: UpdateReply): void {
    this.loadingService.startLoading();
    this.repliesApiService
      .updateReply(commentID, body)
      .pipe(take(1), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (): void => {
          this.toastr.success('Pomyślnie zapisano');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak');
          this.loadingService.stopLoading();
        },
      });
  }

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
