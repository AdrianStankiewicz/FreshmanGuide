import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormalitiesRoutingModule } from './formalities-routing.module';
import { FormalitiesComponent } from 'src/app/modules/formalities/pages/formalities.component';

@NgModule({
  declarations: [FormalitiesComponent],
  imports: [CommonModule, FormalitiesRoutingModule],
})
export class FormalitiesModule {}
