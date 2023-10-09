import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ForumSinglePostComponent } from '../../../modules/forum/pages/single-post/forum-single-post.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-reply-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './reply-popup.component.html',
  styleUrls: ['./reply-popup.component.css'],
})
export class ReplyPopupComponent {
  protected replyForm!: FormGroup;

  private urlParams!: string;
  private postID!: number;

  @ViewChild('nickInputElement') nickInputElement!: ElementRef;
  @ViewChild('replyTextAreaElement') replyTextAreaElement!: ElementRef;
  @ViewChild(ForumSinglePostComponent) singlePost!: ForumSinglePostComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReplyPopupComponent>,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      nick: ['', Validators.required],
      reply: ['', Validators.required],
    });

    this.urlParams = this.data.params;
    const splittedUrl = this.urlParams.split('/');
    const idFromUrl = splittedUrl.pop();
    if (idFromUrl) {
      this.postID = parseInt(idFromUrl);
    }
  }

  ngOnDestroy(): void {
    this.formService.destroy();
  }

  protected onClose(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    if (this.replyForm.valid) {
      this.formService.submit(this.replyForm, this.postID, this.dialogRef);
    } else {
      this.markInvalidInputs();
    }
  }

  private markInvalidInputs(): void {
    for (const control in this.replyForm.controls) {
      if (this.replyForm.controls.hasOwnProperty(control)) {
        this.replyForm.controls[control].markAsTouched();
        if (this.replyForm.controls[control].invalid) {
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
