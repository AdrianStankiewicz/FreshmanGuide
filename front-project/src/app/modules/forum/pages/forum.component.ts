import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription, distinctUntilChanged, take } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';
import { QuestionPopupComponent } from 'src/app/layouts/partials/question-popup/question-popup.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ForumComponent implements OnInit, AfterViewInit, OnDestroy {
  protected pageSize = 3;
  protected slicedPosts: Post[] = [];
  protected categories: Category[] = [];
  protected filteredPosts: Post[] = [];
  protected numberOfPosts = 0;
  protected isAdmin = false;

  private posts: Post[] = [];
  private _subscriptions = new Subscription();

  //searchbar
  protected searchKeyword = '';
  private searchedPosts: Post[] = [];

  //selectCategory
  private postCategory!: Category;
  private selectedCategory = '';

  //selectVerified
  private selectedVerified = '';

  //sort
  private selectedSort = '';

  constructor(
    private loadingService: LoadingService,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialog,
    private location: Location,
    private router: Router
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('verifiedSelectElement') verifiedSelectElement!: ElementRef;
  @ViewChild('sortSelectElement') sortSelectElement!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadingService.startLoading();

    this.checkIfAdmin();

    this._subscriptions.add(
      this.postsService
        .getAllPosts$()
        .pipe(distinctUntilChanged())
        .subscribe({
          next: (posts: Post[]): void => {
            if (posts && posts.length > 0) {
              this.posts = posts;
              this.filteredPosts = this.posts;
              this.slicedPosts = this.filteredPosts.slice(0, this.pageSize);
              this.numberOfPosts = this.filteredPosts.length;
            } else {
              this.loadPostsFromServer();
            }
          },
        })
    );

    this._subscriptions.add(
      this.categoriesService
        .getAllFromCategories()
        .pipe(take(1), distinctUntilChanged())
        .subscribe((categories: Category[]): void => {
          this.categories = categories;
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected onSearchChange(): void {
    this.searchedPosts = this.filteredPosts;
    this.applyFilters();
  }

  protected onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  protected onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }

  protected onSort(event: any): void {
    this.selectedSort = event.target.value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredPosts = this.posts;

    if (this.selectedCategory) {
      filteredPosts = filteredPosts.filter((post: Post): boolean => {
        this.postCategory = this.categories.find(
          (category: Category): boolean => category.id === post.categoryId
        ) || { id: 0, name: '' };
        return this.postCategory.name === this.selectedCategory;
      });
    }

    if (this.selectedVerified === 'yes') {
      filteredPosts = filteredPosts.filter((post: Post): boolean => {
        return post.verified === true;
      });
    }

    if (this.searchKeyword.trim() !== '') {
      filteredPosts = filteredPosts.filter((post): boolean =>
        post.body.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    if (this.selectedSort === 'Popularność') {
      filteredPosts = filteredPosts.sort((a: Post, b: Post): number => {
        return b.reply.length - a.reply.length;
      });
    } else if (this.selectedSort === 'Najnowsze') {
      filteredPosts = filteredPosts.sort((a: Post, b: Post): number => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
    this.filteredPosts = filteredPosts;
    this.numberOfPosts = this.filteredPosts.length;
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.numberOfPosts;
      this.paginator.pageSize = this.pageSize;
    }
    this.slicedPosts = this.filteredPosts;
    this.slicedPosts = this.filteredPosts.slice(0, this.pageSize);
  }

  protected onReset(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';
    this.selectedVerified = '';
    this.selectedSort = '';

    this.filteredPosts = this.posts;
    this.filteredPosts.sort((a: Post, b: Post): number => a.id - b.id);
    this.numberOfPosts = this.filteredPosts.length;

    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
    this.slicedPosts = this.filteredPosts.slice(0, this.pageSize);

    this.categorySelectElement.nativeElement.value = '';
    this.verifiedSelectElement.nativeElement.value = '';
    this.sortSelectElement.nativeElement.value = '';
  }

  protected openDialog(): void {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = 'clamp(310px, 95%, 800px)';

    this.dialogRef.open(QuestionPopupComponent, dialogConfig);
  }

  protected onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredPosts.length) {
      endIndex = this.filteredPosts.length;
    }
    this.slicedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  private loadPostsFromServer(): void {
    this._subscriptions.add(
      this.postsService
        .getAllFromPosts()
        .pipe(distinctUntilChanged())
        .subscribe((posts: Post[]): void => {
          this.posts = posts;
          this.filteredPosts = this.posts;
          this.slicedPosts = this.filteredPosts.slice(0, this.pageSize);
          this.numberOfPosts = this.filteredPosts.length;
        })
    );
  }

  protected trackByFn(index: number, item: Post): number {
    return item.id;
  }

  private checkIfAdmin(): void {
    const token = localStorage.getItem('freshmanGuideJWT');

    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const isAdmin = decoded.isAdmin;
        const location = this.location.path();

        if (isAdmin && location.includes('admin')) {
          this.isAdmin = true;
        }
      } catch (error) {
        throw new Error('Something went wrong');
      }
    }
  }

  protected toPost(postID: number): void {
    if (!this.isAdmin) {
      this.router.navigate([`/forum/post/${postID}`]);
    } else if (this.isAdmin) {
      this.router.navigate([`/admin/forum/post/${postID}`]);
    }
  }
}
