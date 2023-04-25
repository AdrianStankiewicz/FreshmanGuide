import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
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
    private categoriesService: CategoriesService
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
    let questionData = this.questionForm.value;

    if (this.questionForm.valid) {
      console.log(questionData);
    } else {
      console.log('invalid');
    }
  }
}
