import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverflowService {
  public setFixedBody(): void {
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.minHeight = '0';
  }

  public removeFixedBody(): void {
    document.body.style.position = 'static';
    document.body.style.top = 'auto';
    document.body.style.left = 'auto';
    document.body.style.width = '100%';
    document.body.style.height = 'auto';
    document.body.style.minHeight = '100vh';
  }
}
