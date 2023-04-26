import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/http/categories.service';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.css'],
})
export class QuestionPopupComponent {
  public questionForm!: FormGroup;
  categories: Category[] = [];

  getAllFromCategoriesSub!: Subscription;

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('nickInputElement') nickInputElement!: ElementRef;
  @ViewChild('questionTextAreaElement') questionTextAreaElement!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<QuestionPopupComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllFromCategoriesSub = this.categoriesService
      .getAllFromCategories()
      .subscribe((categories: Category[]): void => {
        this.categories = categories;
      });

    this.questionForm = this.formBuilder.group({
      category: ['', Validators.required],
      nick: ['', Validators.required],
      question: ['', Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let questionData: any = this.questionForm.value;

    if (this.questionForm.valid) {
      console.log(questionData);
      this.dialogRef.close();
      setTimeout(() => {
        this.toastr.success('Post został dodany', 'Sukces');
      }, 1000);
    } else {
      this.markInvalidInputs();
    }
  }

  markInvalidInputs(): void {
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
