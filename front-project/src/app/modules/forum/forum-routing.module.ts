import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumSinglePostComponent } from 'src/app/modules/forum/pages/single-post/forum-single-post.component';
import { ForumComponent } from 'src/app/modules/forum/pages/forum.component';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
  },
  {
    path: 'post/:id',
    component: ForumSinglePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
