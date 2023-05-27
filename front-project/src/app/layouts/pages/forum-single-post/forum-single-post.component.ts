import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ReplyPopupComponent } from '../../partials/reply-popup/reply-popup.component';
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
  loading!: boolean;
  routerParamsSub!: Subscription;
  getPostCategorySub!: Subscription;
  postData!: Post;
  postID!: number;
  postCategory!: Category;
  slicedReplies: Reply[] = [];
  pageSize: number = 3;

  filteredReplies: Reply[] = [];
  numberOfReplies: number = 0;

  selectedVerified: string = '';

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
    this.loading = this.loadingService.startLoading();
    window.scrollTo(0, 0);

    this.routerParamsSub = this.route.params.subscribe((data: any) => {
      this.postsService
        .getOneFromPosts(data['id'])
        .subscribe(async (post: Post): Promise<void> => {
          this.postData = post;
          this.filteredReplies = this.postData.reply;
          this.slicedReplies = this.filteredReplies.slice(0, this.pageSize);
          this.numberOfReplies = this.filteredReplies.length;
          this.getPostCategorySub = this.categoriesService
            .getOneFromCategories(this.postData.categoryId)
            .subscribe((category: Category): void => {
              this.postCategory = category;
            });
        });
    });

    const params: Params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingService.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingService.startLoading();
  }

  applyFilters(): void {
    let filteredReplies: Reply[] = this.postData.reply;

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

  onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }

  openDialog(): void {
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

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredReplies.length) {
      endIndex = this.filteredReplies.length;
    }
    this.slicedReplies = this.filteredReplies.slice(startIndex, endIndex);
  }
}
