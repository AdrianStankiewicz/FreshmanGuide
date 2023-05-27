import { Component } from '@angular/core';
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

@Component({
  selector: 'app-forum-single-post',
  templateUrl: './forum-single-post.component.html',
  styleUrls: ['./forum-single-post.component.css'],
})
export class ForumSinglePostComponent {
  loading!: boolean;
  routerParamsSub!: Subscription;
  getPostCategorySub!: Subscription;
  postData!: Post;
  postID!: number;
  postCategory!: Category;

  filteredReplies: Reply[] = [];
  numberOfReplies: number = 0;

  selectedVerified: string = '';

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
          this.getPostCategorySub = this.categoriesService
            .getOneFromCategories(this.postData.categoryId)
            .subscribe((category: Category): void => {
              this.postCategory = category;
            });

          this.filteredReplies = this.postData.reply;
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
}
