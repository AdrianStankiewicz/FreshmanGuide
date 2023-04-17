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
  postsArr: Post[] = [];
  repliesArr: Reply[] = [];
  categoriesArr: Category[] = [];

  getAllFromPostsSub!: Subscription;
  getAllFromRepliesSub!: Subscription;
  getAllFromCategoriesSub!: Subscription;

  constructor(
    private loadingS: LoadingService,
    private postsS: PostsService,
    private repliesS: RepliesService,
    private categoriesS: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();

    this.getAllFromPostsSub = this.postsS
      .getAllFromPosts()
      .subscribe((posts: Post[]): void => {
        this.postsArr = posts;
      });

    this.getAllFromRepliesSub = this.repliesS
      .getAllFromReplies()
      .subscribe((replies: Reply[]): void => {
        this.repliesArr = replies;
      });

    this.getAllFromCategoriesSub = this.categoriesS
      .getAllFromCategories()
      .subscribe((categories: Category[]): void => {
        this.categoriesArr = categories;
      });

    //test item to delete
    this.categoriesS
      .getOneFromCategories(1)
      .subscribe((item: Category): void => {
        console.log(item);
      });

    //test item to delete
    this.postsS.getOneFromPosts(1).subscribe((item: Post): void => {
      console.log(item);
    });

    //test item to delete
    this.repliesS.getOneFromReplies(1).subscribe((item: Reply): void => {
      console.log(item);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingS.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingS.startLoading();
  }
}
