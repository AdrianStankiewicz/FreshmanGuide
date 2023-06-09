import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  toggleIcon: string = 'menu';

  @ViewChild('toggle') menu!: ElementRef;

  toggleMenu(): void {
    if (this.toggleIcon == 'menu') {
      this.toggleIcon = 'close';
      this.menu.nativeElement.style.height = '500px';
      if (screen.width < 992) {
        document.body.style.position = 'fixed';
      }
      document.body.style.width = '100%';
    } else {
      this.toggleIcon = 'menu';
      this.menu.nativeElement.style.height = '0';
      document.body.style.position = 'static';
    }
  }

  closeNav(): void {
    window.scrollTo(0, 0);
    this.toggleIcon = 'menu';
    this.menu.nativeElement.style.height = '0';
    document.body.style.position = 'static';
  }
}
