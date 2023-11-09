import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';
import { Reply } from 'src/app/models/reply';
import { EditForumCommentFormService } from './services/edit-forum-comment-form.service';

@Component({
  selector: 'app-edit-post-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post-comments.component.html',
  styleUrls: ['./edit-post-comments.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class EditPostCommentsComponent implements OnInit, OnDestroy {
  @Input() comments!: Reply[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected slicedReplies: Reply[] = [];
  protected filteredReplies: Reply[] = [];
  protected pageSize = 3;
  protected editCommentFormArray: { id: number; form: FormGroup }[] = [];
  protected commentIndex = 0;

  private numberOfReplies = 0;
  private selectedVerified = '';
  private currentCommentID = 0;

  constructor(
    private editForumCommentFormService: EditForumCommentFormService
  ) {}

  ngOnInit(): void {
    this.comments.forEach((c: Reply): void => {
      this.getCommentForm(c);
    });

    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.editForumCommentFormService.destroy();
  }

  private applyFilters(): void {
    let filteredReplies = this.comments;

    if (this.selectedVerified === 'yes') {
      filteredReplies = filteredReplies.filter((reply: Reply): boolean => {
        return reply.verified === true;
      });
    }

    this.filteredReplies = filteredReplies;
    this.numberOfReplies = this.filteredReplies.length;
    this.slicedReplies = this.filteredReplies;
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.numberOfReplies;
      this.paginator.pageSize = this.pageSize;
    }
    this.slicedReplies = this.filteredReplies.slice(0, this.pageSize);
  }

  protected onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }

  protected onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.commentIndex = startIndex;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredReplies.length) {
      endIndex = this.filteredReplies.length;
    }
    this.slicedReplies = this.filteredReplies.slice(startIndex, endIndex);
  }

  protected trackByFn(index: number, item: Reply): number {
    return index;
  }

  protected delete(): void {
    if (this.currentCommentID && this.currentCommentID !== 0) {
      this.editForumCommentFormService.delete(this.currentCommentID);
    }
  }

  protected saveCommentID(reply: Reply): void {
    if (reply.id) {
      this.currentCommentID = reply.id;
    }
  }

  protected getCommentForm(comment: Reply): FormGroup {
    const pristineForm = this.editForumCommentFormService.buildForm();

    if (comment.id) {
      const response = {
        id: comment.id,
        form: pristineForm,
      };

      this.editCommentFormArray.push(response);
      const form = response.form;

      form.patchValue({
        nick: comment.nick,
        body: comment.body,
        verified: comment.verified,
      });

      return form;
    } else {
      return pristineForm;
    }
  }

  protected submit(comment: Reply): void {
    const commentForm = this.editCommentFormArray.filter(
      (f: { id: number; form: FormGroup<any> }): boolean => f.id === comment.id
    );

    const newComment = {
      nick: comment.nick,
      body: commentForm[0].form.value.body,
      verified: commentForm[0].form.value.verified,
    };

    if (comment.id) {
      this.editForumCommentFormService.submit(comment.id, newComment);
    }
  }
}
