import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocumentsComponent } from './pages/documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
})
export class DocuemntsModule {}
