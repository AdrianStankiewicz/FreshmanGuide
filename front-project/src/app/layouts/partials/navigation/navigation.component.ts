import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OverflowService } from 'src/app/services/overflow.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  protected toggleIcon = 'menu';

  constructor(private overflowService: OverflowService) {}

  @ViewChild('toggle') menu!: ElementRef;

  protected toggleMenu(): void {
    if (this.toggleIcon == 'menu') {
      this.toggleIcon = 'close';
      this.menu.nativeElement.style.height = '500px';
      this.overflowService.setFixedBody();
    } else {
      this.toggleIcon = 'menu';
      this.menu.nativeElement.style.height = '0';
      this.overflowService.removeFixedBody();
    }
  }

  protected closeNav(): void {
    this.toggleIcon = 'menu';
    this.menu.nativeElement.style.height = '0';
    this.overflowService.removeFixedBody();
  }
}
