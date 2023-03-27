import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  toggleIcon: string = 'menu';

  @ViewChild('toggle') menu!: ElementRef;

  public toggleMenu(): void {
    if (this.toggleIcon == 'menu') {
      this.toggleIcon = 'close';
      this.menu.nativeElement.style.height = '100vh';
      this.menu.nativeElement.style.paddingTop = '50px';
    } else {
      this.toggleIcon = 'menu';
      this.menu.nativeElement.style.height = '0';
      this.menu.nativeElement.style.paddingTop = '0';
    }
  }

  changeMotive():void {
  }
}
