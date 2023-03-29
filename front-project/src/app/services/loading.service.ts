import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  startLoading(): boolean {
    return true;
  }

  stopLoading(): boolean {
    return false;
  }
}
