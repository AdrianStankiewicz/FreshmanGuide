import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverflowService } from './overflow.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);

  public getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  constructor(private overflowService: OverflowService) {}

  public startLoading(): boolean {
    this.loading$.next(true);
    this.overflowService.setFixedBody();
    return true;
  }

  public stopLoading(): boolean {
    this.loading$.next(false);
    this.overflowService.removeFixedBody();
    return false;
  }
}
