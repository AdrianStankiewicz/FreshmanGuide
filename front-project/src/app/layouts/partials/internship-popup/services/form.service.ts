import { Injectable, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { InternshipPopupComponent } from '../internship-popup.component';
import { FormGroup } from '@angular/forms';
import { Subject, take, takeUntil, switchMap, Observable } from 'rxjs';
import { Internship } from 'src/app/models/internship';
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
    private internshipsService: InternshipsService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  public submit(
    form: FormGroup,
    categorySelectElement: string,
    facultySelectElement: string,
    dialogRef: MatDialogRef<InternshipPopupComponent>
  ): void {
    this.loadingService.startLoading();
    this.internshipsService
      .postInternship({
        category: categorySelectElement,
        faculty: facultySelectElement,
        name: form.controls['name'].value,        
        link: form.controls['link'].value,        
      })
      .pipe(
        take(1),
        switchMap((): Observable<Internship[]> => {
          return this.internshipsService.getAllFromInternships();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (internships: Internship[]): void => {
          this.internshipsService.allInternships$.next(internships);
          dialogRef.close();
          this.toastr.success('Dodano praktykę', 'Sukces');
          this.loadingService.stopLoading();
        },
        error: (): void => {
          this.toastr.error('Coś poszło nie tak', 'Błąd');
          this.loadingService.stopLoading();
        },
      });
  }
}
