import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Internship } from 'src/app/models/internship';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-internship-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './internship-popup.component.html',
  styleUrls: ['./internship-popup.component.css'],
})
export class InternshipPopupComponent implements OnInit, OnDestroy {
  protected internshipForm!: FormGroup;
  protected internships: Internship[] = [];
  private _subscriptions = new Subscription();

  //selectCategory
  private selectedCategory!: string;
  uniqueCategories: Set<string> = new Set<string>();

  //selectFaculty
  private selectedFaculty!: string;

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('facultySelectElement') facultySelectElement!: ElementRef;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef;
  @ViewChild('linkInputElement') linkInputElement!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<InternshipPopupComponent>,
    private formBuilder: FormBuilder,
    private internshipsService: InternshipsService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.internshipsService
        .getAllFromInternships()
        .pipe(distinctUntilChanged())
        .subscribe((internships: Internship[]): void => {
          this.internships = internships;
          this.uniqueCategories.clear();
            this.internships.forEach((internship) => {
              this.uniqueCategories.add(internship.category);
            });
          this.categorySelectElement.nativeElement.value = '';
          this.facultySelectElement.nativeElement.value = '';
        })
    );

    this.internshipForm = this.formBuilder.group({
      category: ['', Validators.required],
      faculty: ['', Validators.required],
      name: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.formService.destroy();
  }

  protected onClose(): void {
    this.dialogRef.close();
  }

  protected onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
  }

  protected onFacultyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFaculty = selectElement.value;
  }

  protected onSubmit(): void {

    if (this.internshipForm.valid) {

      const selectedCategory = this.internships.find((internship: Internship): boolean => {
        return internship.category === this.selectedCategory;
      });

      const selectedFaculty = this.internships.find((internship: Internship): boolean => {
        return internship.faculty === this.selectedFaculty;
      });

      this.formService.submit(
        this.internshipForm,
        this.selectedCategory,
        this.selectedFaculty,
        this.dialogRef
      );
    }
    else {
      this.markInvalidInputs();
    }
  }

  private markInvalidInputs(): void {
    for (const control in this.internshipForm.controls) {
      if (this.internshipForm.controls.hasOwnProperty(control)) {
        this.internshipForm.controls[control].markAsTouched();
        if (this.internshipForm.controls[control].invalid) {
          const invalidControl: Element | null = document.querySelector(
            `[formControlName="${control}"]`
          );
          if (invalidControl) {
            invalidControl.classList.add('invalid-input');
          }
        }
      }
    }
  }
}
