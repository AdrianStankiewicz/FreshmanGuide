import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from 'src/app/modules/dictionary/pages/dictionary.component';

const routes: Routes = [
  {
    path: '',
    component: DictionaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryRoutingModule {}
