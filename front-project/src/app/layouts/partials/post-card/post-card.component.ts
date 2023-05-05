import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/http/categories.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  postCategory!: Category;

  getPostCategorySub!: Subscription;

  constructor(private categoriesService: CategoriesService) {}

  @Input('postData') postData!: Post;

  ngOnInit(): void {
    this.getPostCategorySub = this.categoriesService
      .getOneFromCategories(this.postData.categoryId)
      .subscribe((category: Category): void => {
        this.postCategory = category;
      });
  }
}
