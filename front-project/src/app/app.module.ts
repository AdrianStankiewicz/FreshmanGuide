import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './layouts/partials/navigation/navigation.component';
import { FooterComponent } from './layouts/partials/footer/footer.component';
import { BanerComponent } from './layouts/partials/baner/baner.component';

@NgModule({
  declarations: [AppComponent],
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
    HttpClientModule,
    MatDialogModule,
    NavigationComponent,
    FooterComponent,
    BanerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
