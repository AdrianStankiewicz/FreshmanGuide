import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormalitiesComponent } from 'src/app/modules/formalities/pages/formalities.component';

const routes: Routes = [
  {
    path: '',
    component: FormalitiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormalitiesRoutingModule {}
