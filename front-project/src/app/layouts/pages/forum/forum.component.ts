import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { QuestionPopupComponent } from '../../partials/question-popup/question-popup.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {
  //variables
  loading!: boolean;
  posts: Post[] = [];
  replies: Reply[] = [];
  categories: Category[] = [];
  filteredPosts: Post[] = [];
  numberOfPosts: number = 0;

  //searchbar
  searchKeyword: string = '';
  searchedPosts: Post[] = [];

  //selectCategory
  postCategory!: Category;
  selectedCategory: string = '';

  //selectVerified
  selectedVerified: string = '';

  //sort
  selectedSort: string = '';

  //subscriptions
  getAllFromPostsSub!: Subscription;
  getAllFromRepliesSub!: Subscription;
  getAllFromCategoriesSub!: Subscription;
  getPostCategorySub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialog
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('verifiedSelectElement') verifiedSelectElement!: ElementRef;
  @ViewChild('sortSelectElement') sortSelectElement!: ElementRef;

  //lifecycle hooks
  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();
    window.scrollTo(0, 0);

    this.getAllFromPostsSub = this.postsService
      .getAllFromPosts()
      .subscribe((posts: Post[]): void => {
        this.posts = posts;

        this.filteredPosts = this.posts;
        this.numberOfPosts = this.filteredPosts.length;
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

  onSearchChange(): void {
    this.searchedPosts = this.filteredPosts;
    this.applyFilters();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }

  onSort(event: any): any {
    this.selectedSort = event.target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredPosts: Post[] = this.posts;

    if (this.selectedCategory) {
      filteredPosts = filteredPosts.filter((post: Post) => {
        this.getPostCategorySub = this.categoriesService
          .getOneFromCategories(post.categoryId)
          .subscribe((category: Category): void => {
            this.postCategory = category;
          });

        return this.postCategory.name === this.selectedCategory;
      });
    }

    if (this.selectedVerified === 'yes') {
      filteredPosts = filteredPosts.filter((post: Post) => {
        return post.verified === true;
      });
    }

    if (this.searchKeyword.trim() !== '') {
      filteredPosts = filteredPosts.filter((post) =>
        post.body.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    if (this.selectedSort === 'Popularność') {
      filteredPosts = filteredPosts.sort((a: Post, b: Post): number => {
        return b.replies.length - a.replies.length;
      });
    } else if (this.selectedSort === 'Najnowsze') {
      filteredPosts = filteredPosts.sort((a: Post, b: Post): number => {
        return b.createdAt.getDate() - a.createdAt.getDate();
      });
    }

    this.filteredPosts = filteredPosts;
    this.numberOfPosts = this.filteredPosts.length;
  }

  onReset(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';
    this.selectedVerified = '';
    this.selectedSort = '';

    this.filteredPosts = this.posts;
    this.filteredPosts.sort((a: Post, b: Post): number => a.id - b.id);
    this.numberOfPosts = this.filteredPosts.length;

    this.categorySelectElement.nativeElement.value = '';
    this.verifiedSelectElement.nativeElement.value = '';
    this.sortSelectElement.nativeElement.value = '';
  }

  openDialog(): void {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = 'clamp(310px, 95%, 800px)';

    this.dialogRef.open(QuestionPopupComponent, dialogConfig);
  }
}
