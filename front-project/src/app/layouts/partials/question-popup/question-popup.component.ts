import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-question-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.css'],
})
export class QuestionPopupComponent implements OnInit, OnDestroy {
  protected questionForm!: FormGroup;
  protected categories: Category[] = [];

  private selectedCategory!: string;
  private _subscriptions = new Subscription();

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('nickInputElement') nickInputElement!: ElementRef;
  @ViewChild('questionTextAreaElement') questionTextAreaElement!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<QuestionPopupComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.categoriesService
        .getAllFromCategories()
        .pipe(distinctUntilChanged())
        .subscribe((categories: Category[]): void => {
          this.categories = categories;
        })
    );

    this.questionForm = this.formBuilder.group({
      category: ['', Validators.required],
      nick: ['', Validators.required],
      question: ['', Validators.required],
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

  protected onSubmit(): void {
    if (this.questionForm.valid) {
      const selectedCategoryID: number | undefined =
        this.categories.find((category: Category): boolean => {
          return category.name === this.selectedCategory;
        })?.id || 1;

      this.formService.submit(
        this.questionForm,
        selectedCategoryID,
        this.dialogRef
      );
    } else {
      this.markInvalidInputs();
    }
  }

  private markInvalidInputs(): void {
    for (const control in this.questionForm.controls) {
      if (this.questionForm.controls.hasOwnProperty(control)) {
        this.questionForm.controls[control].markAsTouched();
        if (this.questionForm.controls[control].invalid) {
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
