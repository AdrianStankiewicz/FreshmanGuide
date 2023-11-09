import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'app-edit-post-comments',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-post-comments.component.html',
  styleUrls: ['./edit-post-comments.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class EditPostCommentsComponent implements OnInit {
  @Input() comments!: Reply[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected slicedReplies: Reply[] = [];
  protected filteredReplies: Reply[] = [];
  protected pageSize = 3;
  private numberOfReplies = 0;
  private selectedVerified = '';

  ngOnInit(): void {
    this.applyFilters();
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
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredReplies.length) {
      endIndex = this.filteredReplies.length;
    }
    this.slicedReplies = this.filteredReplies.slice(startIndex, endIndex);
  }

  protected trackByFn(index: number, item: Reply): number {
    return index;
  }
}
