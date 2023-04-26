import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reply-popup',
  templateUrl: './reply-popup.component.html',
  styleUrls: ['./reply-popup.component.css'],
})
export class ReplyPopupComponent {
  public replyForm!: FormGroup;

  @ViewChild('nickInputElement') nickInputElement!: ElementRef;
  @ViewChild('replyTextAreaElement') replyTextAreaElement!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<ReplyPopupComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      nick: ['', Validators.required],
      reply: ['', Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let replyData: any = this.replyForm.value;

    if (this.replyForm.valid) {
      console.log(replyData);
    } else {
      this.markInvalidInputs();
    }
  }

  markInvalidInputs(): void {
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
