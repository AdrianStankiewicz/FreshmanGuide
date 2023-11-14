import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostCardComponent } from 'src/app/layouts/partials/post-card/post-card.component';
import { EditForumComponent } from './pages/edit-forum/edit-forum.component';
import { EditPostCommentsComponent } from './partials/edit-post-comments/edit-post-comments.component';
import { EditInternshipsComponent } from './pages/edit-internships/edit-internships.component';
import { EditSingleInternshipComponent } from './pages/edit-single-internship/edit-single-internship.component';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, EditForumComponent, EditInternshipsComponent, EditSingleInternshipComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    PostCardComponent,
    EditPostCommentsComponent
  ],
})
export class AdminModule {}
