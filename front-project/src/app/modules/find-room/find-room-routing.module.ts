import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindRoomComponent } from 'src/app/modules/find-room/pages/find-room.component';

const routes: Routes = [
  {
    path: '',
    component: FindRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindRoomRoutingModule {}
