import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layouts/pages/home/home.component';
import { NavigationComponent } from './layouts/partials/navigation/navigation.component';
import { FooterComponent } from './layouts/partials/footer/footer.component';
import { BanerComponent } from './layouts/partials/baner/baner.component';
import { AttractionsComponent } from './layouts/pages/attractions/attractions.component';
import { TeachersComponent } from './layouts/pages/teachers/teachers.component';
import { FindRoomComponent } from './layouts/pages/find-room/find-room.component';
import { MapComponent } from './layouts/partials/map/map.component';
import { FormalitiesComponent } from './layouts/pages/formalities/formalities.component';
import { DictionaryComponent } from './layouts/pages/dictionary/dictionary.component';
import { CanteenComponent } from './layouts/pages/canteen/canteen.component';
import { InternshipComponent } from './layouts/pages/internship/internship.component';
import { ForumComponent } from './layouts/pages/forum/forum.component';
import { PostCardComponent } from './layouts/partials/post-card/post-card.component';
import { ForumSinglePostComponent } from './layouts/pages/forum-single-post/forum-single-post.component';
import { FormsModule } from '@angular/forms';
import { QuestionPopupComponent } from './layouts/partials/question-popup/question-popup.component';
import { ReplyPopupComponent } from './layouts/partials/reply-popup/reply-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    BanerComponent,
    AttractionsComponent,
    TeachersComponent,
    FindRoomComponent,
    MapComponent,
    FormalitiesComponent,
    DictionaryComponent,
    CanteenComponent,
    InternshipComponent,
    ForumComponent,
    PostCardComponent,
    ForumSinglePostComponent,
    QuestionPopupComponent,
    ReplyPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxLoadingModule.forRoot({
      primaryColour: '#FCA311',
      secondaryColour: '#FCA311',
      tertiaryColour: '#FCA311',
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      fullScreenBackdrop: true,
    }),
    ToastrModule.forRoot({}),
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
