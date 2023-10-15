import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from 'src/app/modules/forum/pages/forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostCardComponent } from 'src/app/layouts/partials/post-card/post-card.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumSinglePostComponent } from 'src/app/modules/forum/pages/single-post/forum-single-post.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ForumComponent, ForumSinglePostComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MatPaginatorModule,
    PostCardComponent,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
})
export class ForumModule {}
