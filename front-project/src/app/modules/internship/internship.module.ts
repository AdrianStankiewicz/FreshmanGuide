import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipRoutingModule } from './internship-routing.module';
import { InternshipComponent } from 'src/app/modules/internship/pages/internship.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [InternshipComponent],
  imports: [
    CommonModule,
    InternshipRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
})
export class InternshipModule {}
