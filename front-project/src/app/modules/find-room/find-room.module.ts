import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindRoomRoutingModule } from './find-room-routing.module';
import { FindRoomComponent } from 'src/app/modules/find-room/pages/find-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FindRoomComponent],
  imports: [
    CommonModule,
    FindRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FindRoomModule {}
