import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  startLoading(): boolean {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    return true;
  }

  stopLoading(): boolean {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    return false;
  }
}
