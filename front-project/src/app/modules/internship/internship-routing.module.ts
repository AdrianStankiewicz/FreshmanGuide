import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipComponent } from './pages/internship.component';

const routes: Routes = [
  {
    path: '',
    component: InternshipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternshipRoutingModule {}
