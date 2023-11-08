import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { LoginComponent } from './pages/login/login.component';
import { ForumComponent } from '../forum/pages/forum.component';
import { EditForumComponent } from './pages/edit-forum/edit-forum.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'zaloguj',
    component: LoginComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
  path: 'forum/post/:id',
  component: EditForumComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
