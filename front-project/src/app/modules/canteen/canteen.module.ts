import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanteenRoutingModule } from './canteen-routing.module';
import { CanteenComponent } from './pages/canteen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CanteenComponent],
  imports: [CommonModule, CanteenRoutingModule, MatProgressSpinnerModule],
})
export class CanteenModule {}
