import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading$ = new BehaviorSubject<boolean>(false);

  public getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  private updateLoading$(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }

  public startLoading(): boolean {
    this.updateLoading$(true);
    return true;
  }

  public stopLoading(): boolean {
    this.updateLoading$(false);
    return false;
  }
}
