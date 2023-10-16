import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  protected title = 'front-project';
  protected loading$ = this.loadingService.getLoading$();

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    setTimeout((): void => {
      this.loadingService.stopLoading();
    }, 3000);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
