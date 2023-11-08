import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { EditForumPostFormService } from '../../services/edit-forum-post-form.service';
import { PostsService } from 'src/app/services/http/posts.service';
import {
  Subscription,
  forkJoin,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/http/categories.service';

@Component({
  selector: 'app-edit-forum',
  templateUrl: './edit-forum.component.html',
  styleUrls: ['./edit-forum.component.css'],
})
export class EditForumComponent implements OnInit, AfterViewInit, OnDestroy {
  protected editForm!: FormGroup;
  protected postID!: number;
  protected postData!: Post;
  protected spinnerVal!: boolean;
  protected categories: Category[] = [];

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private editForumPostFormService: EditForumPostFormService,
    private postsApiService: PostsService,
    private route: ActivatedRoute,
    private categoriesApiService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.postID = this.route.snapshot.params['id'];
    this.spinnerVal = true;

    this.editForm = this.editForumPostFormService.getEditPostForm();

    this._subscriptions.add(
      forkJoin([
        this.postsApiService.getOneFromPosts(this.postID),
        this.categoriesApiService.getAllFromCategories(),
      ])
        .pipe(
          take(1),
          tap((response): void => {
            this.postData = response[0];
            this.categories = response[1];

            this.editForm.patchValue({
              nick: this.postData.nick,
              body: this.postData.body,
              verified: this.postData.verified,
              categoryId: this.postData.categoryId,
            });
          }),
          switchMap(() =>
            this.categoriesApiService.getOneFromCategories(
              this.postData.categoryId
            )
          )
        )
        .subscribe((response2: Category): void => {
          this.editForm.patchValue({
            category: response2.name,
          });
          this.spinnerVal = false;
        })
    );

    this.spyOnCategory();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.editForumPostFormService.destroy();
  }

  private spyOnCategory(): void {
    this._subscriptions.add(
      this.editForm.controls['category'].valueChanges.subscribe(
        (value: string): void => {
          const newCategory = this.categories.filter(
            (c: Category): boolean => c.name === value
          );
          this.editForm.patchValue({
            categoryId: newCategory[0].id,
          });
        }
      )
    );
  }

  protected submit(): void {
    const newPost = {
      nick: this.editForm.value.nick,
      body: this.editForm.value.body,
      categoryId: this.editForm.value.categoryId,
      verified: this.editForm.value.verified,
    };

    this.editForumPostFormService.submit(this.postID, newPost);
  }
}
