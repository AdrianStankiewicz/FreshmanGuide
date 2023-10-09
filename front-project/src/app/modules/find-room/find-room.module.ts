import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindRoomRoutingModule } from './find-room-routing.module';
import { FindRoomComponent } from 'src/app/modules/find-room/pages/find-room.component';

@NgModule({
  declarations: [FindRoomComponent],
  imports: [CommonModule, FindRoomRoutingModule],
})
export class FindRoomModule {}
