import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { PostsService } from 'src/app/services/http/posts.service';
import { RepliesService } from 'src/app/services/http/replies.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {
  loading!: boolean;
  posts: Post[] = [];
  replies: Reply[] = [];
  categories: Category[] = [];

  getAllFromPostsSub!: Subscription;
  getAllFromRepliesSub!: Subscription;
  getAllFromCategoriesSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private postsService: PostsService,
    private repliesService: RepliesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromPostsSub = this.postsService
      .getAllFromPosts()
      .subscribe((posts: Post[]): void => {
        this.posts = posts;
      });

    this.getAllFromRepliesSub = this.repliesService
      .getAllFromReplies()
      .subscribe((replies: Reply[]): void => {
        this.replies = replies;
      });

    this.getAllFromCategoriesSub = this.categoriesService
      .getAllFromCategories()
      .subscribe((categories: Category[]): void => {
        this.categories = categories;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingService.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingService.startLoading();
  }
}
