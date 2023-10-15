import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanteenComponent } from 'src/app/modules/canteen/pages/canteen.component';

const routes: Routes = [
  {
    path: '',
    component: CanteenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanteenRoutingModule {}
