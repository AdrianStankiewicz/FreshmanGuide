import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, take } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ReplyPopupComponent } from '../../../../layouts/partials/reply-popup/reply-popup.component';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { Category } from 'src/app/models/category';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';

@Component({
  selector: 'app-forum-single-post',
  templateUrl: './forum-single-post.component.html',
  styleUrls: ['./forum-single-post.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ForumSinglePostComponent {
  protected postData!: Post;
  protected pageSize = 3;
  protected slicedReplies: Reply[] = [];
  protected postCategory!: Category;
  protected filteredReplies: Reply[] = [];

  private postID!: number;
  private _subscriptions = new Subscription();
  private numberOfReplies = 0;
  private selectedVerified = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private dialogRef: MatDialog,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.postsService
        .getAllPosts$()
        .pipe(distinctUntilChanged())
        .subscribe({
          next: (): void => {
            this.route.params.subscribe((data: Params) => {
              this.getPostData(data);
            });
          },
        })
    );

    const params: Params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private applyFilters(): void {
    let filteredReplies = this.postData.reply;

    if (this.selectedVerified === 'yes') {
      filteredReplies = filteredReplies.filter((reply: Reply): boolean => {
        return reply.verified === true;
      });
    }

    this.filteredReplies = filteredReplies;
    this.numberOfReplies = this.filteredReplies.length;
    this.paginator.firstPage();
    this.slicedReplies = this.filteredReplies;
    this.paginator.length = this.numberOfReplies;
    this.paginator.pageSize = this.pageSize;
    this.slicedReplies = this.filteredReplies.slice(0, this.pageSize);
  }

  protected onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }

  protected openDialog(): void {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    const urlParams = this.router.url;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = 'clamp(310px, 95%, 800px)';
    dialogConfig.data = {
      params: urlParams,
    };

    this.dialogRef.open(ReplyPopupComponent, dialogConfig);
  }

  protected onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredReplies.length) {
      endIndex = this.filteredReplies.length;
    }
    this.slicedReplies = this.filteredReplies.slice(startIndex, endIndex);
  }

  private getPostData(data: Params): void {
    this._subscriptions.add(
      this.postsService
        .getOneFromPosts(data['id'])
        .pipe(distinctUntilChanged())
        .subscribe(async (post: Post): Promise<void> => {
          this.postData = post;
          this.filteredReplies = this.postData.reply;
          this.slicedReplies = this.filteredReplies.slice(0, this.pageSize);
          this.numberOfReplies = this.filteredReplies.length;
          this.categoriesService
            .getOneFromCategories(this.postData.categoryId)
            .subscribe((category: Category): void => {
              this.postCategory = category;
            });
        })
    );
  }

  protected trackByFn(index: number, item: Reply): number {
    return index;
  }
}
