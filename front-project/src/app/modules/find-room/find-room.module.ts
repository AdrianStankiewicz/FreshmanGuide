import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindRoomRoutingModule } from './find-room-routing.module';
import { FindRoomComponent } from 'src/app/modules/find-room/pages/find-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SVGFParter } from './svg/F/parter/fParter.component';

@NgModule({
  declarations: [FindRoomComponent],
  imports: [
    CommonModule,
    FindRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SVGFParter
  ],
})
export class FindRoomModule {}
