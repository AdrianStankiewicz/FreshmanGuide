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
  protected showLoadingScreen = false;
  protected loadingScreen = false;

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this.showLoadingScreen = true;
    this.loadingScreen = true;
    document.body.style.overflow = 'hidden';
  }

  ngAfterViewInit(): void {
    setTimeout((): void => {
      this.loadingService.stopLoading();
      this.showLoadingScreen = false;
      this.hideLoadingScreen();
    }, 2000);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private hideLoadingScreen() {
    setTimeout((): void => {
      this.loadingScreen = false;
      document.body.style.overflow = 'auto';
    }, 800);
  }
}
