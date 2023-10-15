import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.css'],
})
export class ContentRowComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() imageSrc!: string;
  @Input() imageDesc!: string;
  @Input() type!: 'first' | 'second';
}
