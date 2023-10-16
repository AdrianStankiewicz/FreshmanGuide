import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/http/categories.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit, OnDestroy {
  protected postCategory!: Category;

  private _subscriptions = new Subscription();

  @Input('postData') postData!: Post;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.categoriesService
        .getOneFromCategories(this.postData.categoryId)
        .pipe(distinctUntilChanged())
        .subscribe((category: Category): void => {
          this.postCategory = category;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
