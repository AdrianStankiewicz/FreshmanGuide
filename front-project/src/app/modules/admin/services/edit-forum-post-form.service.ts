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
import { UpdatePost } from 'src/app/models/post';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class EditForumPostFormService {
  private editPostForm!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  destroy(): void {
    this.unsubscribe$.next(true);
  }

  constructor(
    private fb: FormBuilder,
    private postsApiService: PostsService,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.editPostForm = this.fb.nonNullable.group({
      nick: new FormControl<string>(
        { value: '', disabled: true },
        {
          validators: [Validators.required],
          updateOn: 'blur',
        }
      ),
      category: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      categoryId: new FormControl<number>(0),
      body: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      verified: new FormControl<boolean>(false, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  getEditPostForm(): FormGroup {
    return this.editPostForm;
  }

  validateEditPostForm(editForm: FormGroup): void {
    editForm.markAllAsTouched();
    editForm.updateValueAndValidity();
  }

  submit(postID: number, body: UpdatePost): void {
    this.loadingService.startLoading();
    this.postsApiService
      .updatePost(postID, body)
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

  delete(postID: number): void {
    this.loadingService.startLoading();
    this.postsApiService
      .deletePost(postID)
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
