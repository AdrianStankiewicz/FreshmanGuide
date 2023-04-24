import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  selectedCategory: string = '';
  categoryPosts: Post[] = [];

  //selectVerified
  selectedVerified: string = '';
  verifiedPosts: Post[] = [];

  //sort
  selectedSort: string = '';

  //subscriptions
  getAllFromPostsSub!: Subscription;
  getAllFromRepliesSub!: Subscription;
  getAllFromCategoriesSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private postsService: PostsService,
    private categoriesService: CategoriesService
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('verifiedSelectElement') verifiedSelectElement!: ElementRef;
  @ViewChild('sortSelectElement') sortSelectElement!: ElementRef;

  //lifecycle hooks
  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

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
    if (this.searchKeyword.trim() !== '') {
      this.applyFilters();
    }
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

    if (this.selectedSort === 'Popularność') {
      return this.filteredPosts.sort(
        (a: Post, b: Post): number => b.replies.length - a.replies.length
      );
    } else if (this.selectedSort === 'Najnowsze') {
      return this.filteredPosts.sort(
        (a: Post, b: Post): number =>
          b.createdAt.getDate() - a.createdAt.getDate()
      );
    }

    this.applyFilters();
  }

  applyFilters(): void {
    let filteredPosts = this.posts;

    if (this.selectedCategory) {
      filteredPosts = filteredPosts.filter((post: Post) => {
        return post.categoryId.name === this.selectedCategory;
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
}
