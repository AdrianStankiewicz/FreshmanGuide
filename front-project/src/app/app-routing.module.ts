import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionsComponent } from './layouts/pages/attractions/attractions.component';
import { CanteenComponent } from './layouts/pages/canteen/canteen.component';
import { DictionaryComponent } from './layouts/pages/dictionary/dictionary.component';
import { FindRoomComponent } from './layouts/pages/find-room/find-room.component';
import { FormalitiesComponent } from './layouts/pages/formalities/formalities.component';
import { ForumComponent } from './layouts/pages/forum/forum.component';
import { HomeComponent } from './layouts/pages/home/home.component';
import { InternshipComponent } from './layouts/pages/internship/internship.component';
import { TeachersComponent } from './layouts/pages/teachers/teachers.component';
import { ForumSinglePostComponent } from './layouts/pages/forum-single-post/forum-single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'atrakcje', component: AttractionsComponent },
  { path: 'prowadzacy', component: TeachersComponent },
  { path: 'znajdz-sale', component: FindRoomComponent },
  { path: 'sprawy-studenckie', component: FormalitiesComponent },
  { path: 'slownik', component: DictionaryComponent },
  { path: 'stolowka', component: CanteenComponent },
  { path: 'praktyki', component: InternshipComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/post/:id', component: ForumSinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
