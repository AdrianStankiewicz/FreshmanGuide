import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RepliesService } from 'src/app/services/http/replies.service';
import { ForumSinglePostComponent } from '../../pages/forum-single-post/forum-single-post.component';

@Component({
  selector: 'app-reply-popup',
  templateUrl: './reply-popup.component.html',
  styleUrls: ['./reply-popup.component.css'],
})
export class ReplyPopupComponent {
  public replyForm!: FormGroup;
  urlParams!: any;
  postID!: number;

  @ViewChild('nickInputElement') nickInputElement!: ElementRef;
  @ViewChild('replyTextAreaElement') replyTextAreaElement!: ElementRef;
  @ViewChild(ForumSinglePostComponent) singlePost!: ForumSinglePostComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReplyPopupComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private replyService: RepliesService
  ) {}

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      nick: ['', Validators.required],
      reply: ['', Validators.required],
    });

    this.urlParams = this.data.params;
    const splittedUrl = this.urlParams.split('/');
    this.postID = splittedUrl.pop();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let replyData: any = {
      nick: this.replyForm.controls['nick'].value,
      body: this.replyForm.controls['reply'].value,
      postId: this.postID,
      createdAt: new Date().toISOString(),
      verified: false,
    };

    if (this.replyForm.valid) {
      this.replyService.postReply(replyData).subscribe((response: any) => {
        console.log(response);
      });

      this.dialogRef.close();
      setTimeout(() => {
        this.toastr.success('Komentarz został dodany', 'Sukces');
      }, 1000);
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
