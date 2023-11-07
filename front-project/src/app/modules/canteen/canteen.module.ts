import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanteenRoutingModule } from './canteen-routing.module';
import { CanteenComponent } from './pages/canteen.component';

@NgModule({
  declarations: [CanteenComponent],
  imports: [CommonModule, CanteenRoutingModule],
})
export class CanteenModule {}
