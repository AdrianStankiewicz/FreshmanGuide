import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-svg-fsecond',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fSecond.component.html',
  styleUrls: ['./fSecond.component.css'],
})
export class SVGFSecond implements OnChanges {
  @Input() selectedRoom!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoom']) {
      this.brightRoom(this.selectedRoom);
    }
  }

  private brightRoom(roomName: string): void {
    if (roomName) {
      const allRects = document.querySelectorAll('.room');
      allRects.forEach((rect: any): void => {
        rect.classList.remove('show');
      });

      const selectedRect = document.querySelector(`#${roomName}`);
      if (selectedRect) {
        selectedRect.classList.add('show');
      }
    }
  }
}
