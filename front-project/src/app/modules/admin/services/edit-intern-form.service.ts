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
import { InternshipsService } from 'src/app/services/http/internships.service';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class EditInternFormService {
  private editInternForm!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  destroy(): void {
    this.unsubscribe$.next(true);
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private router: Router,
    private internshipsApiService: InternshipsService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.editInternForm = this.fb.nonNullable.group({
      name: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      link: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      category: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      faculty: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  getEditInternForm(): FormGroup {
    return this.editInternForm;
  }

  validateEditInternForm(editForm: FormGroup): void {
    editForm.markAllAsTouched();
    editForm.updateValueAndValidity();
  }

  delete(internID: number): void {
    this.loadingService.startLoading();
    this.internshipsApiService
      .deleteInternship(internID)
      .pipe(take(1), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (): void => {
          this.toastr.success('Pomyślnie usunięto');
          this.router.navigateByUrl('/admin/praktyki');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak');
          this.loadingService.stopLoading();
        },
      });
  }
}
