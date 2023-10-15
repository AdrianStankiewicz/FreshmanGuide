import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from 'src/app/modules/attractions/pages/attractions.component';
import { MatIconModule } from '@angular/material/icon';
import { ContentRowComponent } from 'src/app/layouts/partials/content-row/content-row.component';

@NgModule({
  declarations: [AttractionsComponent],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    MatIconModule,
    ContentRowComponent,
  ],
})
export class AttractionsModule {}
