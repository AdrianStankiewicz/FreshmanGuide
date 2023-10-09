import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from 'src/app/modules/teachers/pages/teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';

@NgModule({
  declarations: [TeachersComponent],
  imports: [CommonModule, TeachersRoutingModule],
})
export class TeachersModule {}
